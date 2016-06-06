<quovo-demo>
  <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
  <style>
    quovo-demo {
      display: -webkit-box;
      display: flex;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
    import {fn$tag} from "ctx-core/tag/lib";
    import {route__tag$mount} from "ctx-core/route/tag";
    import {assign__quovo$route$$} from "./route";
    import {log,error,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "quovo_demo/quovo-demo.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    route__tag$mount(tag, {
      assign__route$$fn: assign__quovo$route$$
    });
    function on$mount() {
      log(`${logPrefix}|on$mount`);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
    }
  </script>
</quovo-demo>