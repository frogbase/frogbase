module.exports =  {
  get: {
    tags: ["Post"],
    summary: "Get a User",
    description: "Get user\'s data by providing user id.",
    operationId: "get-user",
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "ID of user to find",
      },
    ],
    responses: {
      200: {
        description: "Post is obtained",
        // list of "#/components/schemas/Post"
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Post",
            },
          },
        },
      },
      404: {
        description: "Post is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
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
        description: "Server error",
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
