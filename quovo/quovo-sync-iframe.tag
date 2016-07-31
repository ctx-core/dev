<quovo-sync-iframe class="{loading: !ctx.quovo__iframe$url}">
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
    import {agent__quovo__iframe} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-sync-iframe.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      agent__quovo__iframe(ctx);
      ctx.agent__quovo__iframe.on("change", quovo__iframe__on$change);
      quovo__iframe__on$change();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo__iframe.off("change", quovo__iframe__on$change);
    }
    function quovo__iframe__on$change() {
      log(`${logPrefix}|quovo__iframe__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-sync-iframe>