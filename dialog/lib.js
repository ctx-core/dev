import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/lib";
export function find__dialogs__tag$name(ctx, tag$name) {
  log(`${logPrefix}|find__dialogs__tag$name`);
  const dialogs = ctx.dialogs
      , dialog = dialogs &&
          dialogs.find(
            dialog =>
              dialog.tag$name === tag$name);
  return dialog;
}