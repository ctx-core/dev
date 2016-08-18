var rollup$riot = require("rollup-plugin-riot")
  , rollup$node_resolve = require("rollup-plugin-node-resolve")
  , rollup$includepaths = require("rollup-plugin-includepaths")
  , rollup$commonjs = require("rollup-plugin-commonjs")
  , rollup$sourcemaps = require("rollup-plugin-sourcemaps")
  , rollup$alias = require("rollup-plugin-alias")
  , rollup$json = require("rollup-plugin-json")
  , rollup$watch = require("rollup-watch")
  , rollup$babel = require("rollup-plugin-babel");
module.exports = {
  new__config__rollup,
  new__browser__config__rollup,
  new__node__config__rollup
};
function new__browser__config__rollup() {
  var config$$ = Array.from(arguments)
    , config = new__config__rollup.apply(this, config$$);
  config.intro = `
    var global = typeof window !== 'undefined' ? window :
      typeof global !== 'undefined' ? global :
      this;`;
  config.format = "iife";
  config.globals = {
    global: "window",
    riot: "riot",
    d3: "d3"
  };
  config.plugins = [
    rollup$alias({
      "js-console-color": "ctx-core/logger/browser.js"
    }),
    rollup$sourcemaps(),
    rollup$riot(),
    rollup$includepaths({
      include: {},
      paths: [".", "./ctx-core", "./node_modules"],
      external: [],
      extensions: [".js", ".json", ".html", ".tag"]
    }),
    rollup$node_resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    rollup$commonjs({
      include: "node_modules/**",
      extensions: [ ".js", ".coffee" ]
    }),
    rollup$json(),
    rollup$babel({
      exclude: "node_modules/**"
    })
  ];
  return config;
}
function new__node__config__rollup() {
  var config$$ = Array.from(arguments)
    , config = new__config__rollup.apply(this, config$$);
  config.format = "cjs";
  config.plugins = [
    rollup$riot(),
    rollup$includepaths({
      include: {},
      paths: ["./", "./ctx-core", "./node_modules"],
      external: [
        "aws-sdk",
        "co-fs",
        "crypto",
        "debug",
        "fs",
        "glob",
        "iconv-lite",
        "inflation",
        "inquirer",
        "inquirer-autocomplete-prompt",
        "isomorphic-fetch",
        "koa",
        "koa-generic-session",
        "koa-redirects",
        "koa-sslify",
        "koa-static",
        "methods",
        "mime-db",
        "os-shim",
        "parseurl",
        "path",
        "pg",
        "pg-native",
        "shelljs",
        "statuses",
        "temp",
        "throng",
        "try-thread-sleep",
        "vorpal"
      ],
      extensions: [".js", ".json", ".html", ".tag"]
    }),
    rollup$node_resolve({
      jsnext: true,
      main: true,
      preferBuiltins: true
    }),
    rollup$commonjs({
      include: "node_modules/**",
      extensions: [ ".js", ".coffee" ]
    }),
    rollup$babel({
      exclude: "node_modules/**"
    })
  ];
  return config;
}
function new__config__rollup() {
  var config$$ = Array.from(arguments)
    , assign$$ = [{
        external: ["riot", "fs", "path", "process"]
      }];
  assign$$.push.apply(assign$$, config$$);
  return Object.assign.apply(Object, assign$$);
}