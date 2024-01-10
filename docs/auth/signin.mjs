export default {
  post: {
    tags: ["Auth"],
    summary: "Signin",
    description: "Signin to your account by providing your email and password.",
    operationId: "signin",
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
              password: {
                type: "string",
                example: "@Rahat123",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful. A welcome back email has been sent to your email address.",
      },
      403: {
        description: "Invalid login",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
