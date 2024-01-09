module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Create a login session", // short desc
    summary: "Login",
    operationId: "login", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object", // data type
            properties: {
              email: {
                type: "string", // data type
                example: "sabikrahat72428@gmail.com", // example of a title
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
    // expected responses
    responses: {
      // response code
      200: {
        description: "Login successful", // response desc
      },
      403: {
        description: "Invalid login", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
