import {assign} from "ctx-core/object/lib";
import {array$concat} from "ctx-core/array/lib";
import env from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/html/lib";
export function html_css() {
  log(`${logPrefix}|html_css`);
  const ctx = assign({css: [], indentation: "", indentFirstLine: true}, ...arguments)
      , css = ctx.css
      , indentation = ctx.indentation
      , indentFirstLine = ctx.indentFirstLine;
  return css.map((cssFile, i) => {
    return `${(i || indentFirstLine) ? indentation : ""}<link rel="stylesheet" type="text/css" href="${cssFile}">`;
  }).join("\n");
}
export function css$versioned(script$src) {
  log(`${logPrefix}|js$versioned`);
  const extName = ".css";
  return versioned(`${script$src}${extName}`);
}
export function html_js() {
  log(`${logPrefix}|html_js`);
  const ctx = assign({js: [], indentation: "", indentFirstLine: true}, ...arguments)
      , js = ctx.js
      , indentation = ctx.indentation
      , indentFirstLine = ctx.indentFirstLine;
  return array$concat([],
    `${indentFirstLine ? indentation : ""}<script type="text/javascript">`,
    js.map(
      jsFile =>
        `${indentation}  document.write('<scr'+'ipt type="text/javascript" src="${js$script$src(jsFile)}"></scr'+'ipt>');`
    ),
    `${indentation}</script>`
  ).join("\n");
}
export function js$script$src(script$src) {
  log(`${logPrefix}|js$script$src`);
  return script$src;
}
export function js$versioned(script$src) {
  log(`${logPrefix}|js$versioned`);
  const extName = env.minify ? ".min.js" : ".js";
  return versioned(`${script$src}${extName}`);
}
export function versioned(script$src) {
  log(`${logPrefix}|versioned`);
  return `${script$src}?${version$query()}`;
}
export function version$query() {
  return `v=${encodeURIComponent(env.CACHE_VERSION)}`;
}