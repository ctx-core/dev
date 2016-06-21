<ctx-dialog-topbar class="topbar">
  <back-button onclick="{back_button$onclick}"></back-button>
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
    ctx-dialog-topbar > back-button {
      display: block;
      float: right;
      width: 2em;
      padding: 0.25em 0;
      font-size: 18px;
      cursor: pointer;
    }
    ctx-dialog-topbar > back-button::before {
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
      ctx-dialog-topbar > back-button {
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
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__dialog_agent} from "ctx-core/dialog/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            back_button$onclick: back_button$onclick
          })
        , logPrefix = "dialog/ctx-dialog-topbar.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__dialog_agent(ctx);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
    }
    function back_button$onclick() {
      log(`${logPrefix}|back_button$onclick`);
      clear();
    }
    function clear() {
      log(`${logPrefix}|clear`);
      const dialog_agent = tag.ctx.dialog_agent;
      if (dialog_agent) dialog_agent.remove();
    }
  </script>
</ctx-dialog-topbar>