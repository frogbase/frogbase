module.exports =  {
  post: {
    tags: ["Auth"],
    summary: "Regenerate Tokens",
    description: "Regenerate your access and refresh tokens by providing your refresh token.",
    operationId: "regenerate-tokens",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "refresh-token": {
                type: "string",
                example: "<your_refresh_token>",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/Token",
            },
          }
        },
      },
      500: {
        description: "Server error",
      },
    },
  },
};
