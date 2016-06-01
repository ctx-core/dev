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
    return `${(i || indentFirstLine) ? indentation : ""}<link rel="stylesheet" type="text/css" href="${cssFile}.css?${version_params()}">`;
  }).join("\n");
}
export function js$html() {
  log(`${logPrefix}|js$html`);
  const ctx = assign({jsUrls: [], indentation: "", indentFirstLine: true}, ...arguments)
      , jsUrls = ctx.jsUrls
      , indentation = ctx.indentation
      , indentFirstLine = ctx.indentFirstLine
      , extName = env.isProduction ? ".min.js" : ".js";
  return array$concat$$([],
    `${indentFirstLine ? indentation : ""}<script type="text/javascript">`,
    jsUrls.map(
      jsFile =>
        `${indentation}  document.write('<scr'+'ipt type="text/javascript" src="${jsFile}${extName}?${version_params()}"></scr'+'ipt>');`
    ),
    `${indentation}</script>`
  ).join("\n");
}
function version_params() {
  return `v=${encodeURIComponent(env.cache$version)}`;
}