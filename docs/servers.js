module.exports =  {
  servers:
    process.env.NODE_ENV === "production" ?
      [
        {
          url: "https://frogbase.algoramming.xyz/api",
          description: "Production server",
        },
      ]
      :
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
