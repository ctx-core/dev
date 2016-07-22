<ctx-dialog show="{dialog}" class="{ctx.dialog.tag$name}" onclick="{root__onclick}">
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
      display: none;
      overflow: hidden;
      width: 100%;
    }
    ctx-dialog > content > * > content {
      display: block;
      overflow: hidden;
      background: #ffffff;
      border: 1px dotted #111111;
    }
    @media (max-width: 900px) {
      ctx-dialog > content {
        width: 100%;
        left: 0;
        margin: 0;
      }
    }
  </style>
  <script type="text/babel">
    import {tag__assign,update__ctx as core$update__ctx} from "ctx-core/tag/lib";
    import {dom$,dom$$} from "ctx-core/dom/lib";
    import dom$classes from "ctx-core/dom-classes/lib";
    import {ensure__agent__dialog} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            update__ctx: update__ctx,
            root__onclick: root__onclick,
            mask__onclick: mask__onclick
          })
        , slideOut$delay = 30
        , logPrefix = "ctx-core/dialog/ctx-dialog.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      ensure__agent__dialog(ctx);
      ctx.agent__dialog.on("change", dialog__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      let ctx = tag.ctx;
      ctx.agent__dialog.off("change", dialog__on$change);
    }
    function dialog__on$change() {
      log(`${logPrefix}|dialog__on$change`);
      let ctx = tag.ctx
        , closing = tag.dialog && !ctx.dialog;
      if (closing) {
        dom$classes.remove(tag.root, "start");
      }
      tag.dialog = ctx.dialog;
      if (closing) {
        setTimeout(update, 300);
      } else {
        update();
      }
    }
    function back_button$start() {
      log(`${logPrefix}|back_button$start`);
      dom$classes.set(tag.root, "start", !!(tag.ctx.dialog));
    }
    function root__onclick(e) {
      log(`${logPrefix}|root__onclick`);
      const dom$clear$$ = [tag.root, dom$("content", tag.root), ...Array.from(dom$$("ctx-dialog > content > *", tag.root))];
      if (dom$clear$$.find(dom => dom === e.target)) {
        clear();
        return false;
      }
      return true;
    }
    function mask__onclick(e) {
      log(`${logPrefix}|mask__onclick`);
      clear();
    }
    function clear() {
      log(`${logPrefix}|clear`);
      let ctx = tag.ctx;
      tag.root.style.display = "none";
      ctx.agent__dialog.remove();
      trigger__dialog$tag("hide");
    }
    function update() {
      log(`${logPrefix}|update`);
      tag.update__ctx();
      trigger__dialog$tag("show");
    }
    function trigger__dialog$tag() {
      log(`${logPrefix}|trigger__dialog$tag`);
      let ctx = tag.ctx;
      const dialog = ctx.dialog
          , dialog$tag$name = dialog && dialog.tag$name
          , dialog$tag = dialog$tag$name && tag.tags[dialog$tag$name];
      if (dialog$tag) dialog$tag.trigger(...arguments);
    }
    function update__ctx() {
      log(`${logPrefix}|update__ctx`);
      setTimeout(back_button$start, slideOut$delay);
      return core$update__ctx.call(tag, ...arguments);
    }
  </script>
</ctx-dialog>