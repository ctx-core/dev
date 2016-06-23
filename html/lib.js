import {assign} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import env from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/html/lib";
export function css$html() {
  log(`${logPrefix}|css$html`);
  const ctx = assign({cssUrls: [], indentation: "", indentFirstLine: true}, ...arguments)
      , cssUrls = ctx.cssUrls
      , indentation = ctx.indentation
      , indentFirstLine = ctx.indentFirstLine;
  return cssUrls.map((cssFile, i) => {
    return `${(i || indentFirstLine) ? indentation : ""}<link rel="stylesheet" type="text/css" href="${cssFile}">`;
  }).join("\n");
}
export function css$versioned(script$src) {
  log(`${logPrefix}|js$versioned`);
  const extName = ".css";
  return versioned(`${script$src}${extName}`);
}
export function js$html() {
  log(`${logPrefix}|js$html`);
  const ctx = assign({jsUrls: [], indentation: "", indentFirstLine: true}, ...arguments)
      , jsUrls = ctx.jsUrls
      , indentation = ctx.indentation
      , indentFirstLine = ctx.indentFirstLine;
  return array$concat$$([],
    `${indentFirstLine ? indentation : ""}<script type="text/javascript">`,
    jsUrls.map(
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
  const extName = env.isProduction ? ".min.js" : ".js";
  return versioned(`${script$src}${extName}`);
}
export function versioned(script$src) {
  log(`${logPrefix}|versioned`);
  return `${script$src}?${version$query()}`;
}
export function version$query() {
  return `v=${encodeURIComponent(env.cache$version)}`;
}