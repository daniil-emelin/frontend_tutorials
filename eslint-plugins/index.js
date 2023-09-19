const { checkTitle } = require("./check-title");

const plugin = { rules: { "check-title": checkTitle } };
module.exports = plugin;
