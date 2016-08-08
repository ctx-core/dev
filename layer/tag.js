import {clone} from "ctx-core/object/lib";
import co from "co";
import {layers__agent} from "ctx-core/layer/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/layer/tag";
export function mount__layers(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__layers`);
  const mount$ctx = clone(...mount$ctx$$)
      , dom$el = mount$ctx.dom$el || document.body;
  let ctx = tag.ctx;
  layers__agent(ctx);
  ctx.layers__agent.unshift({
      layers: [{
        zIndex: 0,
        dom$el: dom$el
      }]
    });
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__layers|on$mount`);
    ctx.layers__agent.pick__on(mount$ctx);
  }
  function on$unmount() {
    log(`${logPrefix}|mount__layers|on$unmount`);
    ctx.layers__agent.pick__off(mount$ctx);
  }
}