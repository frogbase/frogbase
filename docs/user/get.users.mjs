export default {
  get: {
    tags: ["User"],
    summary: "Get all users",
    description: "Get all users by providing a valid access token.",
    operationId: "get-users",
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [],
    responses: {
      200: {
        description: "Users were obtained",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      500: {
        description: "Internal Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
