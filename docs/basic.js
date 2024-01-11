module.exports =  {
  openapi: "3.0.3",
  info: {
    title: process.env.PROJECT_NAME,
    description: "An open source backend using node js and postgresql for your next SaaS software.",
    version: process.env.PROJECT_VERSION,
    contact: {
      name: process.env.SMTP_SENDER_NAME,
      email: process.env.SMTP_FROM,
      url: "https://github.com/frogbase",
    },
  },
};
