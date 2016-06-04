<ctx-dialog-topbar>
  <title show="{dialog.title}">&nbsp;{dialog.title}&nbsp;</title>
  <back-button onclick="{back_button$onclick}"></back-button>
  <style>
    ctx-dialog-topbar {
      flex: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      overflow: hidden;
      line-height: 1.25em;
      background: #efefef;
      border-bottom: 1px dotted #111111;
      padding: 10px 0;
    }
    ctx-dialog-topbar > title {
      flex: auto;
      display: block;
      font-size: 18px;
      font-weight: bold;
    }
    ctx-dialog-topbar > back-button {
      flex: 1;
      flex-grow: 0;
      flex-shrink: 0;
      padding: 0;
      cursor: pointer;
    }
    ctx-dialog-topbar > back-button:before {
      display: block;
      width: 2em;
      text-align: center;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
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
      assign__dialog_agent(self.ctx);
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
      const dialog_agent = self.ctx.dialog_agent;
      if (dialog_agent) dialog_agent.remove();
    }
  </script>
</ctx-dialog-topbar>