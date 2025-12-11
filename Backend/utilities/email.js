const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  console.log("Attempting email send via Resend...");
  console.log("To:", to);
  console.log("Subject:", subject);

  try {
    const result = await resend.emails.send({
      from: "Taikent <onboarding@resend.dev>",
      to,
      subject,
      html
    });

    console.log("RESEND RESULT:", result);
    return result;
  } catch (err) {
    console.error("RESEND SEND ERROR:", err);
    throw err;
  }
};
module.exports = {resend, sendEmail};
