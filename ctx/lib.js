import {assign,clone,keys} from "ctx-core/object/lib";
import {agent$$trigger$change} from "ctx-core/agent/lib";
import uuid from "uuid";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/ctx/lib";
export function assign__ctx$id() {
  log(`${logPrefix}|assign__ctx$id`);
  let ctx = assign(...arguments);
  if (!ctx.ctx$id) ctx.ctx$id = uuid();
  return ctx;
}