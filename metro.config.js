const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  "fb2",
  "xhtml",
  "html",
  "json",
  "epub"
);

module.exports = config;
