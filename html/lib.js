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
    return `${(i || indentFirstLine) ? indentation : ""}<link rel="stylesheet" type="text/css" href="${cssFile}.css?${version$query()}">`;
  }).join("\n");
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
  if (script$src.string$raw && script$src.src) {
    return script$src.src;
  } else {
    const extName = env.isProduction ? ".min.js" : ".js"
    return `${script$src}${extName}?${version$query()}`;
  }
}
export function string$raw(src) {
  log(`${logPrefix}|string$raw`);
  return {string$raw: true, src: src};
}
export function version$query() {
  return `v=${encodeURIComponent(env.cache$version)}`;
}