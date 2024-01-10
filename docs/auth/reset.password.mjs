export default {
  post: {
    tags: ["Auth"], 
    summary: "Reset password", 
    description: "Reset your password by providing the token sent to your email address.",
    operationId: "reset-password", 
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              token: {
                type: "string",
                example: "a1B2c3",
              },
              password: {
                type: "string",
                example: "12345678",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Password reset successful", 
      },
      400: {
        description: "validation error", 
      },
      500: {
        description: "Server error", 
      },
    },
  },
};
