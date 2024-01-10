export default {
  delete: {
    tags: ["User"],
    summary: "Delete a user",
    description: "Deleting a user by providing user id. Only user with same id can delete the user.", 
    operationId: "delete-user", 
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
        description: "Deleting a user", 
      },
    ],
    responses: {
      200: {
        description: "User deleted successfully", 
      },
      401: {
        description: "Unauthorized", 
      },
      404: {
        description: "User not found", 
      },
      500: {
        description: "Server error", 
      },
    },
  },
};
