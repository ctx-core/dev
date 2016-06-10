<quovo-demo>
  <app-layout ctx="{opts.ctx}">
    <yield to="content">
      <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
    </yield>
  </app-layout>
  <style>
    quovo-demo {
      display: -webkit-box;
      display: flex;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {tag$mount__route} from "msci_demo/route";
    import {assign__quovo$routes} from "ctx-core/quovo_demo/route";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "quovo_demo/quovo-demo.tag";
    log(logPrefix);
    tag$mount__route(tag, {
      assign__routes$fn: assign__quovo$routes
    });
  </script>
</quovo-demo>