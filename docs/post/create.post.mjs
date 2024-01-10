export default {
  post: {
    tags: ["Post"],
    summary: "Create a new post",
    description: "Create a post by providing the post data.",
    operationId: "create-post",
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [],
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
      201: {
        description: "Post created successfully",
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
      500: {
        description: "Server error",
      },
    },
  },
};
