export default {
  post: {
    tags: ["File"],
    summary: "Upload a file",
    description: "Upload any type of file by providing the file path. Only user with a valid access token can upload the file. Currently no file size limit is set.",
    operationId: "upload-file",
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              files: {
                type: "array",
                items: {
                  type: "file",
                  format: "binary",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "File uploaded successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/File",
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
