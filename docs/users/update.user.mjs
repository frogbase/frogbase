module.exports = {
  // operation's method
  put: {
    tags: ["Users"], // operation's tag
    description: "Update user", // short desc
    summary: "Update a user",
    operationId: "updateUser", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [
      // expected params
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/id", // id model
        },
        required: true, // mandatory
        description: "Id of user to be updated", // short desc.
      },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object", // data type
            properties: {
              username: {
                type: "string", // data-type
                example: "sabikrahat", // desc
              },
              email: {
                type: "string", // data-type
                example: "sabikrahat72428@gmail.com", // desc
              },
              fullname: {
                type: "string", // data-type
                example: "Sabik Rahat", // desc
              },
              address: {
                type: "string", // data-type
                example:
                  "House #12, Road #02, Dag-1677, Merul Badda, Anandanagar, Gulshan-1212, Dhaka, Bangladesh", // desc
              },
              phone: {
                type: "string", // data-type
                example: "+8801647629698", // desc
              },
              dob: {
                type: "string", // data-type
                example: "2000-12-03", // desc
              },
              roles: {
                type: "array", // data-type
                example: ["admin", "customer"], // desc
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "User updated successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // user data model
            },
          },
        },
      },
      // response code
      403: {
        description: "Data exists already", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // user data model
            },
          },
        },
      },
      // response code
      500: {
        description: "Server error", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // user data model
            },
          },
        },
      },
    },
  },
};
