<quovo-demo>
  <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
  <style>
    quovo-demo {
      display: flex;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import riot from "riot";
    import {assign__quovo$route$$} from "./route";
    import {log,error,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this)
        , logPrefix = "quovo_demo/quovo-demo.tag";
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$route$$(ctx);
      ctx.route$name_agent.on("change", route$name_agent$on$change);
      riot.route.exec();
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx;
      ctx.route$name_agent.on("change", route$name_agent$on$change);
      riot.route.stop();
    }
    function route$name_agent$on$change() {
      log(`${logPrefix}|route$name_agent$on$change`);
      assign__ctx$update();
    }
    function assign__ctx$update() {
      log(`${logPrefix}|assign__ctx$update`);
      let ctx = assign(self.ctx, ...arguments);
      assign(self, {ctx: ctx});
      self$update();
    }
    function self$update() {
      log(`${logPrefix}|self$update`);
      self.update();
    }
  </script>
</quovo-demo>