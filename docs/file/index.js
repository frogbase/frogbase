
const uploadFile = require("./upload.file.js");

module.exports =  {
  "/file": {
    ...uploadFile,
  },
};
