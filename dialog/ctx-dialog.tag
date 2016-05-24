<ctx-dialog show="{dialog}">
  <dialog>
    <top>
      <back-button onclick="{back_button$onclick}"></back-button>
      <title show="{dialog.title}">{dialog.title}</title>
    </top>
    <content>
      <yield/>
    </content>
  </dialog>
  <style>
    ctx-dialog {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      transition: all 0.3s ease;
    }
    ctx-dialog > mask {
      position: absolute;
      background: transparent;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 101;
    }
    ctx-dialog > dialog {
      left: 100%;
      display: block;
      height: 100%;
      width: 400px;
      padding: 0;
      opacity: 1.0;
      background: #ffffff;
      border: 1px dotted #111111;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    ctx-dialog > dialog.start {
      left: calc(100% - 400px);
    }
    ctx-dialog > dialog > * {
      display: block;
      padding: 10px 20px;
    }
    ctx-dialog > dialog > top {
      overflow: hidden;
      line-height: 1.25em;
      background: #efefef;
      border-bottom: 1px dotted #111111;
      clear: both;
    }
    ctx-dialog > dialog > top > back-button {
      float: left;
      width: 30px;
      padding: 0 10px;
      cursor: pointer;
    }
    ctx-dialog > dialog > top > back-button:before {
      content: "\02192";
    }
    ctx-dialog > dialog.start > top > back-button:before {
      content: "\02190";
    }
    ctx-dialog > dialog > top > title {
      display: block;
      float: right;
      font-size: 24px;
      font-weight: bold;
    }
    ctx-dialog > dialog > content {
      padding-left: 40px;
      line-height: inherit;
      flex: inherit auto;
    }
    ctx-dialog > dialog > content > * {
      display: block;
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
            mask$onclick: mask$onclick,
            back_button$onclick: back_button$onclick
          })
        , slideOut$delay = 30
        , slideIn$delay = 300
        , logPrefix = "site/ctx-dialog.tag";
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
      debug(`${logPrefix}|dialog_agent$on$change|1`, arguments);
      let ctx = self.ctx
        , closing = self.dialog && !ctx.dialog;
      if (closing) {
        dom$classes.remove(dom$dialog(), "start");
      }
      self.dialog = ctx.dialog;
      if (closing) {
        setTimeout(assign__ctx$update, 300);
      } else {
        assign__ctx$update();
      }
    }
    function back_button$start() {
      log(`${logPrefix}|back_button$start`);
      dom$classes.set(dom$dialog(), "start", !!(tag.ctx.dialog));
    }
    function mask$onclick() {
      log(`${logPrefix}|mask$onclick`);
      clear();
    }
    function back_button$onclick() {
      log(`${logPrefix}|back_button$onclick`);
      clear();
    }
    function dom$dialog() {
      return dom$("dialog", tag.root);
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