module.exports = {
  servers:
    [
      {
        url: `http://localhost:${process.env.PORT}/api`,
        description: "Local server",
      },
      {
        url: "https://frogbase.algoramming.xyz/api",
        description: "Production server",
      },
    ],
};
