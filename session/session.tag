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
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__authentication_agent} from "ctx-core/authentication/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/session/session.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__authentication_agent(ctx);
      ctx.authentication_agent.on("change", authentication_agent$on$change);
      tag.assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.authentication_agent.off("change", authentication_agent$on$change);
    }
    function authentication_agent$on$change() {
      log(`${logPrefix}|authentication_agent$on$change`);
      tag.assign__ctx$update();
    }
  </script>
  </script>
</session>