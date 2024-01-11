module.exports =  {
  post: {
    tags: ["Auth"],
    summary: "Signup",
    description: "Create a account if you don't have one.",
    operationId: "signup",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                example: "sabikrahat",
              },
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              password: {
                type: "string",
                example: "@Rahat123",
              },
              name: {
                type: "string",
                example: "Md. Sabik Alam Rahat",
              },
              avatar: {
                type: "string",
                example: "https://avatars.githubusercontent.com/u/56132740?v=4",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Signup successful. A welcome email has been sent to your email address.",
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
      401: {
        description: "Input error",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
