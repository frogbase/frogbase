export default {
  put: {
    tags: ["Post"],
    summary: "Update a post",
    description: "Update post information by providing user id.",
    operationId: "update-user",
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
        description: "Id of post to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                example: "This is a post title",
              },
              description: {
                type: "string",
                example: "This is a post description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
              },
              image: {
                type: "string",
                example: "https://avatars.githubusercontent.com/u/56132740?v=4",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Post updated successfully",
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
