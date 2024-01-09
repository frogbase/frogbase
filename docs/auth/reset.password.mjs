module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Reset password", // short desc
    summary: "Change password",
    operationId: "resetPassword", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                example: "a1B2c3",
              },
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              password: {
                type: "string",
                example: "123456",
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
        description: "Password reset successful", // response desc
      },
      400: {
        description: "validation error", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
