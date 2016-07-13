<ctx-session>
  <a
    class="login-link"
    show="{ctx.login_link$onclick && !ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.login_link$onclick}">login</a>
  <a
    class="signup-link"
    show="{ctx.signup_link$onclick && !ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.signup_link$onclick}">signup</a>
  <a
    class="logout-link"
    show="{ctx.logout_link$onclick && ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.logout_link$onclick
    }">logout</a>
  <style>
    ctx-session > * {
      cursor: pointer;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__agent__authentication} from "auth/agent";
    import {mount__authentication} from "ctx-core/auth/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/session/ctx-session.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    mount__authentication(tag, {agent__authentication: ctx.agent__authentication});
    tag.on("mount", on$mount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      tag.update__ctx();
    }
  </script>
</ctx-session>