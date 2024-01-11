module.exports = {
  post: {
    tags: ["Auth"],
    summary: "Signin",
    description: "Signin to your account by providing your email and password.",
    operationId: "signin",
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
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                statusCode: {
                  type: "number",
                  example: 201,
                },
                message: {
                  type: "string",
                  example: "Signup successful. A welcome email has been sent to your email address.",
                },
                data: {
                  type: "object",
                  $ref: "#/components/schemas/User",
                },
                tokens: {
                  type: "object",
                  $ref: "#/components/schemas/Token",
                }
              },
            },
          },
        },
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
