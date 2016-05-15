<quovo-users-tile class="quovo-tile">
  <quovo-users-navigation
    class="quovo-navigation"
    ctx="{opts.ctx}"
    show="{ctx.authentication}"></quovo-users-navigation>
  <content>
    <quovo-user-tile
      show="{ctx.authentication && ctx.route__quovo$user$tile}"
      ctx="{opts.ctx}"></quovo-user-tile>
  </content>
  <style>
    .quovo-tile {
      display: flex;
      flex: auto;
    }
    .quovo-tile > .quovo-navigation {
      display: flex;
      flex-direction: column;
      flex: inherit auto;
      width: 200px;
      border: 1px #111111 dotted;
    }
    .quovo-tile > content {
      display: flex;
      flex: auto;
    }
    .quovo-tile > content > .quovo-navigation {
      flex: auto;
    }
    .quovo-navigation > title {
      display: block;
      min-height: 1.8em;
      padding: 5px 10px;
      background: #eeeeee;
      border: 1px dotted gray;
    }
    .quovo-navigation > content {
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__authentication_agent} from "ctx-core/authentication/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update
          })
        , logPrefix = "censible-dashboard/cen-dialogs.tag";
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__authentication_agent(ctx);
      ctx.authentication_agent.on("change", authentication_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      self.ctx.authentication_agent.off("change", authentication_agent$on$change);
    }
    function authentication_agent$on$change() {
      log(`${logPrefix}|authentication_agent$on$change`);
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
</quovo-users-tile>