module.exports = {
  servers:
    [
      {
        url: `http://${process.env.POSTGRES_HOST}:${process.env.PORT}/api`,
        description: "Server",
      }
    ],
};
