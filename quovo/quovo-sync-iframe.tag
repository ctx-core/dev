<quovo-sync-iframe class="{loading: !quovo__iframe$url}">
  <iframe src="{ctx.quovo__iframe$url}" if="{ctx.quovo__iframe$url}"></iframe>
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
    import {ensure__agent__quovo__iframe} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-sync-iframe.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      ensure__agent__quovo__iframe(ctx);
      const agent__quovo__iframe = ctx.agent__quovo__iframe;
      agent__quovo__iframe.on("change", quovo__iframe__on$change);
      quovo__iframe__on$change();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , agent__quovo__iframe = ctx.agent__quovo__iframe;
      agent__quovo__iframe.off("change", quovo__iframe__on$change);
    }
    function quovo__iframe__on$change() {
      log(`${logPrefix}|quovo__iframe__on$change`);
      tag$assign__page(...arguments);
    }
    function tag$assign__page() {
      log(`${logPrefix}|tag$assign__page`);
      let ctx = tag.ctx;
      assign(ctx, ...arguments);
      assign(tag, ctx);
      tag.update__ctx();
    }
  </script>
</quovo-sync-iframe>