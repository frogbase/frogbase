module.exports =  {
  post: {
    tags: ["Auth"], 
    summary: "Forgot Password", 
    description: "Change your password if you forgot it. A reset password token will be sent to your registered email address.",
    operationId: "forgot-password", 
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success", 
      },
      400: {
        description: "Email not found", 
      },
      500: {
        description: "Server error", 
      },
    },
  },
};
