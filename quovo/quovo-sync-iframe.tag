<quovo-sync-iframe class="{loading: !quovo$iframe$url}">
  <iframe src="{ctx.quovo$iframe$url}" if="{ctx.quovo$iframe$url}"></iframe>
  <style>
    quovo-sync-iframe {
      display: -webkit-box;
      display: flex;
    }
    quovo-sync-iframe.loading:before {
      height: 200px;
      width: 100%;
      padding: 10px 0 0;
    }
    quovo-sync-iframe > * {
      -webkit-flex: auto;
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__quovo$iframe_agent} from "./agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/quovo/quovo-sync-iframe.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$iframe_agent(ctx);
      const quovo$iframe_agent = ctx.quovo$iframe_agent;
      quovo$iframe_agent.on("change", quovo$iframe_agent$change);
      quovo$iframe_agent$change();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , quovo$iframe_agent = ctx.quovo$iframe_agent;
      quovo$iframe_agent.off("change", quovo$iframe_agent$change);
    }
    function quovo$iframe_agent$change() {
      log(`${logPrefix}|quovo$iframe$on$change`);
      tag$assign__page(...arguments);
    }
    function tag$assign__page() {
      log(`${logPrefix}|tag$assign__page`);
      let ctx = tag.ctx;
      assign(ctx, ...arguments);
      assign(tag, ctx);
      tag.assign__ctx$update();
    }
  </script>
</quovo-sync-iframe>