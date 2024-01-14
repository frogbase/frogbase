const nodemailer = require("nodemailer");
const ErrorHandler = require("../helpers/error.class.js");
class MailService {
  transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  });

  async signupMail(user) {
    try {
      const message = {
        from: {
          name: process.env.SMTP_SENDER_NAME,
          address: process.env.SMTP_FROM,
        },
        to: user.email,
        subject: `Welcome to ${process.env.PROJECT_NAME}`,
        html: `
        <p>Hello ${user.name},</p>
        <p> Welcome to ${process.env.PROJECT_NAME}. We are glad to have you.</p>
        <p>
          Thanks,<br/>
          ${process.env.PROJECT_NAME} team
        </p>
      `,
      };

      await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
  };

  async signinMail(user) {
    try {
      const message = {
        from: {
          name: process.env.SMTP_SENDER_NAME,
          address: process.env.SMTP_FROM,
        },
        to: user.email,
        subject: `Welcome back to ${process.env.PROJECT_NAME}`,
        html: `
        <p>Hello ${user.name},</p>
        <p> Welcome back to ${process.env.PROJECT_NAME}. We are glad to have you.</p>
        <p><i>If you didn't sign in, we recommend you to change your password immediately.</i></p>
        <p>
          Thanks,<br/>
          ${process.env.PROJECT_NAME} team
        </p>
      `,
      };

      await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
  };

  async forgetPasswordMail(user, fpSalt) {
    try {
      // Calculate the expiration time (15 minutes from now)
      const expirationTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleString(); // 15 minutes in milliseconds
      const date = expirationTime.split(",")[0].trim();
      const time = expirationTime.split(",")[1].trim();

      const message = {
        from: {
          name: process.env.SMTP_SENDER_NAME,
          address: process.env.SMTP_FROM,
        },
        to: user.email,
        subject: `Forget Password token of your ${process.env.PROJECT_NAME}.`,
        html: `
        <p>Hello ${user.name},</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <h2 style="color: #333; font-size: 24px;">Forgot Password</h2>
          <p style="color: #666; font-size: 16px;">Your reset password token is:</p>
          <div style="background-color: #fff; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 26px; margin-top: 10px;">
            ${fpSalt}
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            <b>Note: This token will expire on ${time}, ${date} (15 minutes).</b>
          </p>
        </div >
        <p>
          Thanks,<br/>
          ${process.env.PROJECT_NAME} team
        </p>
      `,
      };

      await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error.message);
    }
  };

  async changePasswordMail(user) {
    try {
      const message = {
        from: {
          name: process.env.SMTP_SENDER_NAME,
          address: process.env.SMTP_FROM,
        },
        to: user.email,
        subject: `Password Changed of your ${process.env.PROJECT_NAME}.`,
        html: `
        <p>Hello ${user.name},</p>
        <p>Your password has been changed successfully.</p>
        <p>
          Thanks,<br/>
          ${process.env.PROJECT_NAME} team
        </p>
      `,
      };

      await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error.message);
    }
  };
}

module.exports = new MailService();
