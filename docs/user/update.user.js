module.exports =  {
  put: {
    tags: ["User"],
    summary: "Update a user",
    description: "Update user information by providing user id. Only user with same id can update the user.",
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
        description: "Id of user to be updated",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                example: "sabikrahat",
              },
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              fullname: {
                type: "string",
                example: "Sabik Rahat",
              },
              address: {
                type: "string",
                example:
                  "House #12, Road #02, Dag-1677, Merul Badda, Anandanagar, Gulshan-1212, Dhaka, Bangladesh",
              },
              phone: {
                type: "string",
                example: "+8801647629698",
              },
              dob: {
                type: "string",
                example: "2000-12-03",
              },
              roles: {
                type: "array",
                example: ["admin", "customer"],
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "User updated successfully",
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
