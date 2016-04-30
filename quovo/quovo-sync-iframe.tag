<quovo-sync-iframe class="{loading: !quovo$iframe$url}">
  <iframe src="{ctx.quovo$iframe$url}" if="{ctx.quovo$iframe$url}"></iframe>
  <style>
    quovo-sync-iframe {
      display: flex;
    }
    quovo-sync-iframe.loading:before {
      height: 200px;
      width: 100%;
      padding: 10px 0 0;
    }
    quovo-sync-iframe > * {
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__quovo$iframe_agent} from "./agent";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this)
        , logPrefix = "ctx-core/quovo/quovo-sync-iframe.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$iframe_agent(ctx);
      const quovo$iframe_agent = ctx.quovo$iframe_agent;
      quovo$iframe_agent.on("change", quovo$iframe_agent$change);
      quovo$iframe_agent$change();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx
          , quovo$iframe_agent = ctx.quovo$iframe_agent;
      quovo$iframe_agent.off("change", quovo$iframe_agent$change);
    }
    function quovo$iframe_agent$change() {
      log(`${logPrefix}|quovo$iframe_agent$on$change`);
      tag$assign__page(...arguments);
    }
    function tag$assign__page() {
      log(`${logPrefix}|tag$assign__page`);
      let ctx = self.ctx;
      assign(ctx, ...arguments);
      assign(self, ctx);
      self$update();
    }
    function self$update() {
      log(`${logPrefix}|self$update`);
      self.update();
    }
  </script>
</quovo-sync-iframe>