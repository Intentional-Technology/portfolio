// Main config loader - uses either config files if in dev mode or heroku config if on heroku.
var configCache;

// Mimic the "get" functionality of the config module.
class HerokuConfig {
  constructor(config) {
    this.config = JSON.parse(config);
  }
  get(fieldName) {
    let fieldNames = fieldName.split(".");
    let parsedConfig = this.config;
    fieldNames.forEach((fieldName) => (parsedConfig = parsedConfig[fieldName]));
    return parsedConfig;
  }
}

var loadConfig = function () {
  if (configCache) return configCache;
  if (process.env.HEROKU_CONFIG) {
    var config = process.env.HEROKU_CONFIG;
    console.log("Heroku environment detected. Using config " + config);
    if (config) {
      configCache = new HerokuConfig(config);
    } else {
      throw new Error(
        "Failed to load config. Check the HEROKU_CONFIG in Heroku's config vars.",
      );
    }
  } else {
    console.log("Loading config using node-config");
    configCache = require("config");
  }
  return configCache;
};

module.exports = { config: loadConfig() };
