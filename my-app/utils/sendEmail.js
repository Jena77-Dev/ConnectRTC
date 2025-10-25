const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {

  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] Would send email to ${email}: ${subject}`);
    return { success: true, message: "Email disabled in development" }; 
  }

  try {

    // Connect with SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      service: process.env.SERVICE,
      auth: {
        user: 'aaron34@ethereal.email',
        pass: 'JQ9kX16RCHNY4McXhg'
      }
      // secure: Boolean(process.env.SECURE),
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      // },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      // text: text,
      html: `<p>Click <a href="${text}">here</a> to verify your Email</p>`,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    console.error(`Error sending mail to ${email}`);
    throw error; // Re-throw the error for the calling code to handle
  }
};