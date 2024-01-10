export default {
  get: {
    tags: ["Post"],
    summary: "Get all posts",
    description: "Get all posts by providing a valid access token.", 
    operationId: "get-posts", 
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [], 
    responses: {
      200: {
        description: "Posts were obtained", 
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Post", 
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
