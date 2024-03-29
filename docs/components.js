module.exports =  {
  components: {
    schemas: {
      id: {
        type: "number",
        description: "An id of a model",
        example: 1,
      },
      Model: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "An id of a model",
            example: 1,
          },
          created: {
            type: "string",
            description: "Date of creation. Will be generated automatically",
            example: "20244-01-10T08:28:57.000Z",
          },
          updated: {
            type: "string",
            description: "Date of update. Will be generated updated",
            example: "2024-01-10T09:11:57.000Z",
          },
        },
      },
      Token: {
        type: "object",
        properties: {
          'access-token': {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA0OTEyOTM5LCJleHAiOjE3MDQ5MTM1Mzl9.-ahHPzNFdzXd6T_AaUxr5KQMnkS7OEHZbSqDQEBeL-M",
          },
          'refresh-token': {
            type: "string",
            exmaple: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA0OTEyOTM5LCJleHAiOjE3MDQ5MTQ3Mzl9.4rdxDAMzIRiNwILx1YoXScBN5R9fQi7ryos4dOUKtaQ",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "number",
            example: 1,
          },
          username: {
            type: "string",
            example: "sabikrahat",
          },
          email: {
            type: "string",
            example: "sabikrahat72428@gmail.com",
          },
          password: {
            type: "string",
            example: "^@wra@m+SrNs!lS",
          },
          name: {
            type: "string",
            example: "Md. Sabik Alam Rahat",
          },
          phone: {
            type: "string",
            example: "+8801647629698",
          },
          avatar: {
            type: "string",
            example: "https://avatars.githubusercontent.com/u/56132740?v=4",
          },
          created: {
            type: "string",
            example: "20244-01-10T08:28:57.000Z",
          },
          updated: {
            type: "string",
            example: "2024-01-10T09:11:57.000Z",
          },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: {
            type: "number",
            example: 1,
          },
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
          creator: {
            type: "object",
            properties: {
              id: {
                type: "number",
                example: 1,
              },
              username: {
                type: "string",
                example: "sabikrahat",
              },
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              password: {
                type: "string",
                example: "^@wra@m+SrNs!lS",
              },
              name: {
                type: "string",
                example: "Md. Sabik Alam Rahat",
              },
              phone: {
                type: "string",
                example: "+8801647629698",
              },
              avatar: {
                type: "string",
                example: "https://avatars.githubusercontent.com/u/56132740?v=4",
              },
              created: {
                type: "string",
                example: "20244-01-10T08:28:57.000Z",
              },
              updated: {
                type: "string",
                example: "2024-01-10T09:11:57.000Z",
              },
            },
          },
          updator: {
            type: "object",
            properties: {
              id: {
                type: "number",
                example: 1,
              },
              username: {
                type: "string",
                example: "sabikrahat",
              },
              email: {
                type: "string",
                example: "sabikrahat72428@gmail.com",
              },
              password: {
                type: "string",
                example: "^@wra@m+SrNs!lS",
              },
              name: {
                type: "string",
                example: "Md. Sabik Alam Rahat",
              },
              phone: {
                type: "string",
                example: "+8801647629698",
              },
              avatar: {
                type: "string",
                example: "https://avatars.githubusercontent.com/u/56132740?v=4",
              },
              created: {
                type: "string",
                example: "20244-01-10T08:28:57.000Z",
              },
              updated: {
                type: "string",
                example: "2024-01-10T09:11:57.000Z",
              },
            },
          },
          created: {
            type: "string",
            example: "20244-01-10T08:28:57.000Z",
          },
          updated: {
            type: "string",
            example: "2024-01-10T09:11:57.000Z",
          },
        },
      },
      File: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "rahat-avatar.jpg",
          },
          path: {
            type: "string",
            example: "uploads/2024-01-10T11-02-52.818Z_dt_rahat-avatar.jpg",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Success status",
            example: false,
          },
          status: {
            type: "string",
            description: "error status",
            example: "error",
          },
          statusCode: {
            type: "number",
            description: "Error internal code",
            example: 500,
          },
          message: {
            type: "string",
            description: "Error message",
            example: "Not found",
          },
        },
      },
    },
    securitySchemes: {
      JWT: {
        type: "apiKey",
        name: "authorization",
        in: "header",
        description:
          'Prefix the value with "Bearer" to indicate the Bearer Token authorization type',
      },
    },
  },
};
