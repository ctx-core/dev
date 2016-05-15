<session>
  <login-link
    show="{ctx.login_link$onclick && !ctx.authentication}"
    onclick="{ctx.login_link$onclick}">login</login-link>
  <signup-link
    show="{ctx.signup_link$onclick && !ctx.authentication}"
    onclick="{ctx.signup_link$onclick}">signup</signup-link>
  <logout-link
    show="{ctx.logout_link$onclick && ctx.authentication}"
    onclick="{ctx.logout_link$onclick}">logout</logout-link>
  <style>
    session > * {
      cursor: pointer;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__authentication_agent} from "ctx-core/authentication/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this)
        , logPrefix = "ctx-core/session/session.tag";
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__authentication_agent(ctx);
      ctx.authentication_agent.on("change", authentication_agent$on$change);
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.authentication_agent.off("change", authentication_agent$on$change);
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
</session>