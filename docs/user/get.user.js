module.exports =  {
  get: {
    tags: ["User"],
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
        description: "User is obtained", 
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", 
            },
          },
        },
      },
      404: {
        description: "User is not found", 
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
