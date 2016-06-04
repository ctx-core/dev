<ctx-dialog show="{dialog}">
  <content onclick="{content$onclick}">
    <yield />
  </content>
  <mask onclick="{mask$onclick}"></mask>
  <style>
    ctx-dialog {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      transition: all 0.3s ease;
    }
    ctx-dialog > mask {
      position: static;
      background: #ffffff;
      width: 100%;
      height: 100%;
      z-index: 101;
      transition: all 0.3s ease;
    }
    ctx-dialog.start > mask {
      opacity: 0.8;
    }
    ctx-dialog > content {
      position: fixed;
      width: 60%;
      left: 50%;
      height: 100%;
      margin-left: -30%;
      opacity: 1.0;
      z-index: 102;
      transition: all 0.3s ease;
      overflow-y: visible;
    }
    ctx-dialog > content > * {
      display: block;
      overflow: hidden;
      background: #ffffff;
      border: 1px dotted #111111;
    }
    ctx-dialog > content > content {
      line-height: inherit;
      flex: inherit auto;
      padding: 10px 20px;
    }
    ctx-dialog > content > content > * {
      display: block;
    }
    @media (max-width: 650px) {
      ctx-dialog > content {
        width: 100%;
        left: 0;
        margin: 0;
      }
    }
  </style>
  <script type="text/babel">
    import {fn$tag,self$update as tag$lib__self$update} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {dom$} from "ctx-core/dom/lib";
    import dom$classes from "ctx-core/dom-classes/lib";
    import {assign__dialog_agent} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            self$update: self$update,
            content$onclick: content$onclick,
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
    function content$onclick(e) {
      log(`${logPrefix}|content$onclick`);
      if (e.target === dom$("content", tag.root)) {
        clear();
      }
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