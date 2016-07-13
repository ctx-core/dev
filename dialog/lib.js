import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/lib";
export function find__dialog$$__tag$name(ctx, tag$name) {
  log(`${logPrefix}|find__dialog$$__tag$name`);
  const dialog$$ = ctx.dialog$$
      , dialog = dialog$$ &&
          dialog$$.find(
            dialog =>
              dialog.tag$name === tag$name);
  return dialog;
}