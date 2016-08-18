#!/usr/bin/env node
/**
 * list project rollup entries {file,script} based on ./rollup.json
 * @module ctx-core/rollup/rollup-files
 * @example
 * #!/bin/bash
 * rollup-files.js -t http
 * # http build file list
 * rollup-files.js -t browser
 * # browser build file list
 */
const minimist = require("minimist")
    , argv = minimist(process.argv.slice(2), {"--": true})
    , suffix = (argv["--"] || []).join(" ")
    , config_file = argv.c || "./rollup.json"
    , target = argv.t || "browser"
    , fs = require("fs")
    , config__json = fs.readFileSync(config_file, "utf8")
    , config = JSON.parse(config__json)
    , entries = config.entries || {}
    , lines = (entries[target] || [])
        .map(
          entry => {
            let cmd;
            if (/^\$/.test(entry)) {
              console.info(entry);
              cmd = entry.replace(/^\$/, "");
            } else {
              cmd = `rollup -c "${entry}"`;
            }
            if (suffix) {
              cmd += (" " + suffix);
            }
            return cmd;
          }
        );
console.info((lines || []).join("\n"));