export default {
  delete: {
    tags: ["Post"],
    summary: "Delete a post",
    description: "Deleting a post by providing user id. Only creator of the post can delete it.", 
    operationId: "delete-post", 
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
        description: "Deleting a post", 
      },
    ],
    responses: {
      200: {
        description: "Post deleted successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      401: {
        description: "Unauthorized", 
      },
      404: {
        description: "Post not found", 
      },
      500: {
        description: "Server error", 
      },
    },
  },
};
