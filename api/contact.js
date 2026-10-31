const nodemailer = require("nodemailer");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

module.exports = async function contact(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Méthode non autorisée." });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
  const recipient = CONTACT_TO_EMAIL || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !recipient) {
    return response.status(503).json({
      ok: false,
      message: "Le service email n'est pas configuré. Ajoutez SMTP_HOST, SMTP_USER, SMTP_PASS et CONTACT_TO_EMAIL dans les variables d'environnement Vercel."
    });
  }

  try {
    const payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const subject = String(payload.subject || "Nouveau message du portfolio").trim();
    const message = String(payload.message || "").trim();

    if (!name || !email || !message) {
      return response.status(400).json({ ok: false, message: "Merci de remplir votre nom, email et message." });
    }

    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    await transport.sendMail({
      from: process.env.SMTP_FROM || SMTP_USER,
      to: recipient,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}`,
      html: `<p><strong>Nom :</strong> ${escapeHtml(name)}</p><p><strong>Email :</strong> ${escapeHtml(email)}</p><p><strong>Sujet :</strong> ${escapeHtml(subject)}</p><p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
    });

    return response.status(200).json({ ok: true, message: "Votre message a bien été envoyé." });
  } catch (error) {
    console.error("Contact email failed:", error);
    return response.status(500).json({ ok: false, message: "Impossible d'envoyer le message pour le moment." });
  }
};
