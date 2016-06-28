<quovo-demo>
  <cen-dashboard-layout ctx="{opts.ctx}">
    <yield to="content">
      <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
    </yield>
  </cen-dashboard-layout>
  <style>
    quovo-demo {
      display: -webkit-box;
      display: flex;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {quovo$router__tag$mount} from "ctx-core/quovo_demo/route";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "quovo_demo/quovo-demo.tag";
    log(logPrefix);
    quovo$router__tag$mount(tag);
  </script>
</quovo-demo>