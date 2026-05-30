const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const nodemailer = require('nodemailer');

const rootDir = __dirname;
const port = Number(process.env.PORT) || 3000;
const contactRecipient = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || '';
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const mailTransportConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }
  : null;

const mailTransport = mailTransportConfig ? nodemailer.createTransport(mailTransportConfig) : null;

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });

    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function parseContactPayload(requestBody, contentType) {
  if (contentType.includes('application/json')) {
    return JSON.parse(requestBody || '{}');
  }

  return Object.fromEntries(new URLSearchParams(requestBody));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';

  fs.readFile(filePath, (error, fileBuffer) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Server error');
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fileBuffer);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const rawPath = decodeURIComponent(requestUrl.pathname);

  if (request.method === 'POST' && rawPath === '/api/contact') {
    (async () => {
      if (!mailTransport || !contactRecipient) {
        response.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({
          ok: false,
          message: 'Le service email n\'est pas configuré. Ajoutez SMTP_HOST, SMTP_USER, SMTP_PASS et CONTACT_TO_EMAIL.'
        }));
        return;
      }

      try {
        const requestBody = await readRequestBody(request);
        const contentType = String(request.headers['content-type'] || '');
        const payload = parseContactPayload(requestBody, contentType);

        const name = String(payload.name || '').trim();
        const email = String(payload.email || '').trim();
        const subject = String(payload.subject || 'Nouveau message du portfolio').trim();
        const message = String(payload.message || '').trim();
        const phone = String(payload.phone || '').trim();

        if (!name || !email || !message) {
          response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          response.end(JSON.stringify({ ok: false, message: 'Merci de remplir votre nom, email et message.' }));
          return;
        }

        const emailSubject = `[Portfolio] ${subject}`;
        const textLines = [
          `Nom: ${name}`,
          `Email: ${email}`,
          phone ? `Téléphone: ${phone}` : null,
          `Sujet: ${subject}`,
          '',
          message
        ].filter(Boolean);

        const htmlLines = [
          `<p><strong>Nom:</strong> ${escapeHtml(name)}</p>`,
          `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
          phone ? `<p><strong>Téléphone:</strong> ${escapeHtml(phone)}</p>` : '',
          `<p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>`,
          `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
        ].filter(Boolean);

        await mailTransport.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: contactRecipient,
          replyTo: email,
          subject: emailSubject,
          text: textLines.join('\n'),
          html: htmlLines.join('\n')
        });

        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ ok: true, message: 'Votre message a bien été envoyé.' }));
      } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ ok: false, message: 'Impossible d\'envoyer le message pour le moment.' }));
      }
    })();
    return;
  }

  const relativePath = rawPath === '/' ? '/index.html' : rawPath;
  const filePath = path.normalize(path.join(rootDir, relativePath));

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error) {
      const fallbackPath = path.join(rootDir, 'index.html');
      if (relativePath !== '/index.html' && fs.existsSync(fallbackPath)) {
        sendFile(response, fallbackPath);
        return;
      }

      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        sendFile(response, indexPath);
        return;
      }

      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    sendFile(response, filePath);
  });
});

server.listen(port, () => {
  console.log(`Static server running on http://localhost:${port}`);
});
