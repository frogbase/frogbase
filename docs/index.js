const basic = require("./basic.js");
const servers = require("./servers.js");
const components = require("./components.js");
const tags = require("./tags.js");
const paths = require("./paths.js");

module.exports =  {
  ...basic,
  ...servers,
  ...components,
  ...tags,
  ...paths,
};
