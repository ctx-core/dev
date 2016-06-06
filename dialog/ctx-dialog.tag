<ctx-dialog show="{dialog}" class="{ctx.dialog.tag$name}" onclick="{root$onclick}">
  <content>
    <yield />
  </content>
  <style>
    ctx-dialog {
      position: absolute;
      display: -webkit-box;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      z-index: 100;
      transition: all 0.3s ease;
    }
    ctx-dialog > content {
      display: block;
      position: absolute;
      width: 60%;
      left: 50%;
      height: 100%;
      margin: 0 0 0 -30%;
      opacity: 1.0;
      z-index: 102;
      transition: all 0.3s ease;
      overflow-y: hidden;
    }
    ctx-dialog > content > * {
      display: block;
      width: 100%;
      overflow: hidden;
    }
    ctx-dialog > content > * > content {
      background: #ffffff;
      border: 1px dotted #111111;
    }
    @media (max-width: 900px) {
      ctx-dialog > content {
        width: 100%;
        left: 0;
        margin: 0;
      }
      ctx-dialog > content > * {
        margin-top: 0;
      }
    }
  </style>
  <script type="text/babel">
    import {fn$tag,self$update as tag$lib__self$update} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {dom$,dom$$} from "ctx-core/dom/lib";
    import dom$classes from "ctx-core/dom-classes/lib";
    import {assign__dialog_agent} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            self$update: self$update,
            root$onclick: root$onclick,
            mask$onclick: mask$onclick
          })
        , slideOut$delay = 30
        , logPrefix = "ctx-core/dialog/ctx-dialog.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__dialog_agent(ctx);
      ctx.dialog_agent.on("change", dialog_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      let ctx = tag.ctx;
      ctx.dialog_agent.off("change", dialog_agent$on$change);
    }
    function dialog_agent$on$change() {
      log(`${logPrefix}|dialog_agent$on$change`);
      let ctx = tag.ctx
        , closing = tag.dialog && !ctx.dialog;
      if (closing) {
        dom$classes.remove(tag.root, "start");
      }
      tag.dialog = ctx.dialog;
      if (closing) {
        setTimeout(assign__ctx$update, 300);
      } else {
        assign__ctx$update();
      }
    }
    function back_button$start() {
      log(`${logPrefix}|back_button$start`);
      dom$classes.set(tag.root, "start", !!(tag.ctx.dialog));
    }
    function root$onclick(e) {
      log(`${logPrefix}|root$onclick`);
      const dom$clear$$ = [tag.root, dom$("content", tag.root), ...Array.from(dom$$("ctx-dialog > content > *", tag.root))];
      if (dom$clear$$.find(dom => dom === e.target)) {
        clear();
        return false;
      }
      return true;
    }
    function mask$onclick(e) {
      log(`${logPrefix}|mask$onclick`);
      clear();
    }
    function clear() {
      log(`${logPrefix}|clear`);
      ctx.dialog_agent.remove();
    }
    function assign__ctx$update() {
      log(`${logPrefix}|assign__ctx$update`);
      tag.assign__ctx$update();
    }
    function self$update() {
      log(`${logPrefix}|self$update`);
      setTimeout(back_button$start, slideOut$delay);
      return tag$lib__self$update.call(tag, ...arguments);
    }
  </script>
</ctx-dialog>