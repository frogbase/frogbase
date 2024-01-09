module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Get refresh token", // short desc
    summary: "Refresh Token",
    operationId: "refreshToken", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "refresh-token": {
                type: "string",
                example: "your_refresh_token",
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "success", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
