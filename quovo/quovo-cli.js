#!/usr/bin/env node
var fs = require("fs");
try {
  fs.statSync("private/dist/quovo-cli.js")
} catch (error$message) {
  if (error$message.code === "ENOENT") {
    console.error("quovo-cli not built. run `rollup -c ctx-core/quovo/cli.rollup.config.js`\n" + error$message);
  } else {
    console.error(error$message);
  }
  process.exit(1);
}
require("private/dist/quovo-cli");