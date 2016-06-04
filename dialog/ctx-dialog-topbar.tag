<ctx-dialog-topbar>
  <back-button onclick="{back_button$onclick}">&nbsp;</back-button>
  <title show="{dialog.title}">{dialog.title}</title>
  <style>
    ctx-dialog-topbar {
      display: block;
      width: 100%;
      overflow: hidden;
      line-height: 1.25em;
      background: #efefef;
      border-bottom: 1px dotted #111111;
      clear: both;
      padding: 10px 0;
    }
    ctx-dialog-topbar > back-button {
      float: right;
      width: 30px;
      padding: 0;
      cursor: pointer;
    }
    ctx-dialog-topbar > title {
      display: block;
      float: right;
      font-size: 18px;
      font-weight: bold;
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