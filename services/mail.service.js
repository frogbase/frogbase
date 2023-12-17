const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");
const { ErrorHandler } = require("../helpers/error");

const transporter = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
});

const signupMail = async (user) => {
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

    await transporter.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const signinMail = async (user) => {
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

    await transporter.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const resetPasswordMail = async (user) => {
  try {
    const message = {
      from: {
        name: process.env.SMTP_SENDER_NAME,
        address: process.env.SMTP_FROM,
      },
      to: user.email,
      subject: `Reset your ${process.env.PROJECT_NAME} password`,
      html: `
        <p>Hello ${user.name},</p>
        <p>Click on the button below to reset your password.</p>
        <p>
          <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Reset password</a>
        </p>
        <p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>
        <p>
          Thanks,<br/>
          ${process.env.PROJECT_NAME} team
        </p>
      `,
    };

    await transporter.sendMail(message);
  } catch (error) {
    logger.error(error);
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { signupMail, signinMail, resetPasswordMail };
