<quovo-user-details class="{loading: !ctx.quovo$user}">
  <id>
    <label>id</label>
    <value>{ctx.quovo$user.id}</value>
  </id>
  <username>
    <label>username</label>
    <value>{ctx.quovo$user.username}</value>
  </username>
  <email>
    <label>email</label>
    <value><a href="mailto:${ctx.quovo$user.email}">{ctx.quovo$user.email}</a></value>
  </email>
  <value>
    <label>value</label>
    <value>{currency$format(ctx.quovo$user)}</value>
  </value>
  <style>
    quovo-user-details {
      display: block;
      padding: 10px;
    }
    quovo-user-details.loading > * {
      display: none;
    }
    quovo-user-details > * {
      display: block;
      overflow: hidden;
      padding-bottom: 10px;
    }
    quovo-user-details > * > * {
      float: left;
    }
    quovo-user-details > * > label {
      width: 120px;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign__quovo$user_agent} from "./agent";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update
          })
        , logPrefix = "ctx-core/quovo/quovo-user-details.tag";
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$user_agent(ctx);
      ctx.quovo$user_agent.on("change", quovo$user_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user_agent.off("change", quovo$user_agent$on$change);
    }
    function quovo$user_agent$on$change() {
      log(`${logPrefix}|quovo$user_agent$on$change`);
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
</quovo-user-details>