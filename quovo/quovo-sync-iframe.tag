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
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__agent__quovo$iframe} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-sync-iframe.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$iframe(ctx);
      const agent__quovo$iframe = ctx.agent__quovo$iframe;
      agent__quovo$iframe.on("change", quovo$iframe__on$change);
      quovo$iframe__on$change();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , agent__quovo$iframe = ctx.agent__quovo$iframe;
      agent__quovo$iframe.off("change", quovo$iframe__on$change);
    }
    function quovo$iframe__on$change() {
      log(`${logPrefix}|quovo$iframe__on$change`);
      tag$assign__page(...arguments);
    }
    function tag$assign__page() {
      log(`${logPrefix}|tag$assign__page`);
      let ctx = tag.ctx;
      assign(ctx, ...arguments);
      assign(tag, ctx);
      tag.ctx$update();
    }
  </script>
</quovo-sync-iframe>