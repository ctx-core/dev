<ctx-dialog show="{dialog}" class="{ctx.dialog.tag$name}" onclick="{onclick__root}">
  <section>
    <yield from="section" />
    <yield />
  </section>
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
    ctx-dialog > section {
      position: absolute;
      display: block;
      overflow-y: hidden;
      width: 100%;
      height: 100%;
    }
    ctx-dialog > section > * {
      overflow: hidden;
      position: absolute;
      width: 60%;
      left: 50%;
      height: auto;
      margin-left: -30%;
      opacity: 1.0;
      z-index: 102;
      transition: all 0.3s ease;
    }
    ctx-dialog > section > * > section {
      display: block;
      overflow: hidden;
      background: #ffffff;
      border: 1px dotted #111111;
    }
    /* .dialog-center */
    ctx-dialog > section > .dialog-center > .topbar > .back-button {
      float: right;
    }
    ctx-dialog > section > .dialog-center > .topbar > .back-button::before {
      content: "\2715";
    }
    @media (max-width: 900px) {
      ctx-dialog > section {
        width: 100%;
        left: 0;
        margin: 0;
      }
    }
    /* .dialog-right */
    ctx-dialog > section > .dialog-right {
      width: 30%;
      height: 100%;
      left: auto;
      right: 0;
    }
    ctx-dialog > section > .dialog-right > .topbar > title {
      float: right;
      text-align: right;
    }
    ctx-dialog > section > .dialog-right > .topbar > .back-button {
      float: left;
    }
    ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
      content: "\02192";
    }
    ctx-dialog.start > section > .dialog-right > .topbar > .back-button::before {
      content: "\02190";
    }
    ctx-dialog > section > .dialog-right > section {
      height: calc(100% - 3rem);
    }
    @media (max-width: 900px) {
      ctx-dialog > section > .dialog-right > .topbar > title {
        float: none;
        text-align: center;
      }
      ctx-dialog > section > .dialog-right > .topbar > .back-button {
        float: right;
      }
      ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
        content: "\2715";
      }
      ctx-dialog.start > section > .dialog-right > .topbar > .back-button::before {
        content: "\2715";
      }
      ctx-dialog > section > .dialog-right > section {
        height: auto;
      }
    }
  </style>
  <script type="text/babel">
    import {
      tag__assign,
      update__ctx as core$update__ctx} from "ctx-core/tag/lib";
    import {dom$,dom$$} from "ctx-core/dom/lib";
    import dom$classes from "ctx-core/dom-classes/lib";
    import {agent__dialog} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            update__ctx: update__ctx,
            onclick__root: onclick__root,
            onclick__mask: onclick__mask
          })
        , slideOut__delay = 30
        , logPrefix = "ctx-core/dialog/ctx-dialog.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      agent__dialog(ctx);
      ctx.agent__dialog.on("change", on$change__dialog);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      let ctx = tag.ctx;
      ctx.agent__dialog.off("change", on$change__dialog);
    }
    function on$change__dialog() {
      log(`${logPrefix}|on$change__dialog`);
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
    function onclick__root(e) {
      log(`${logPrefix}|onclick__root`);
      const dom$clear$$ = [
        tag.root,
        dom$("section", tag.root),
        ...Array.from(dom$$("ctx-dialog > section > *", tag.root))];
      if (dom$clear$$.find(dom => dom === e.target)) {
        clear();
        return false;
      }
      return true;
    }
    function onclick__mask(e) {
      log(`${logPrefix}|onclick__mask`);
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
      setTimeout(back_button$start, slideOut__delay);
      return core$update__ctx.call(tag, ...arguments);
    }
  </script>
</ctx-dialog>