import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/lib";
export function dialog$$find__tag$name(ctx, tag$name) {
  log(`${logPrefix}|dialog$$find__tag$name`);
  const dialog$$ = ctx.dialog$$
      , dialog = dialog$$ &&
          dialog$$.find(
            dialog =>
              dialog.tag$name === tag$name);
  return dialog;
}