export default {
  post: {
    tags: ["Auth"],
    summary: "Change Password",
    description: "Change password by providing old password.",
    operationId: "change-password",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              oldPassword: {
                type: "string",
                example: "@Rahat123",
              },
              newPassword: {
                type: "string",
                example: "12345678",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success - Password changed successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
