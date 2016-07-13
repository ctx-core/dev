<ctx-dialog-topbar class="topbar">
  <ctx-back-button onclick="{back_button__onclick}"></ctx-back-button>
  <title show="{ctx.dialog.title}">&nbsp;{ctx.dialog.title}&nbsp;</title>
  <style>
    ctx-dialog-topbar {
      display: block;
      height: 3rem;
      width: 100%;
      overflow: hidden;
      min-height: 1.25em;
      line-height: 1.25em;
      background: #222222;
      border-bottom: 1px dotted #000000;
      padding: 10px 0;
    }
    ctx-dialog-topbar > ctx-back-button {
      display: block;
      float: right;
      width: 2em;
      padding: 0.25em 0;
      font-size: 18px;
      cursor: pointer;
    }
    ctx-dialog-topbar > ctx-back-button::before {
      display: block;
      width: 2em;
      height: 1.3em;
      text-align: center;
    }
    ctx-dialog-topbar > title {
      display: block;
      padding: 0.25em 0;
      font-size: 18px;
      font-weight: bold;
    }
    @media (max-width: 900px) {
      ctx-dialog-topbar {
        height: 3.2rem;
      }
      ctx-dialog-topbar > ctx-back-button {
        position: absolute;
        right: 0;
        float: none;
      }
      ctx-dialog-topbar > title {
        width: 100%;
        text-align: center;
      }
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__dialog} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            back_button__onclick: back_button__onclick,
            registerElement: ["ctx-back-button"]
          })
        , logPrefix = "dialog/ctx-dialog-topbar.tag";
    tag.on("mount", on$mount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__dialog(ctx);
    }
    function back_button__onclick() {
      log(`${logPrefix}|back_button__onclick`);
      clear();
    }
    function clear() {
      log(`${logPrefix}|clear`);
      const agent__dialog = tag.ctx.agent__dialog;
      if (agent__dialog) agent__dialog.remove();
    }
  </script>
</ctx-dialog-topbar>