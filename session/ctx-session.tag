<ctx-session>
  <login-link
    show="{ctx.login_link$onclick && !ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.login_link$onclick}">login</login-link>
  <signup-link
    show="{ctx.signup_link$onclick && !ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.signup_link$onclick}">signup</signup-link>
  <logout-link
    show="{ctx.logout_link$onclick && ctx[ctx.quovo__authentication$key]}"
    onclick="{ctx.logout_link$onclick
    }">logout</logout-link>
  <style>
    ctx-session > * {
      cursor: pointer;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__censible$authentication_agent} from "authentication/agent";
    import {authentication__tag$mount} from "ctx-core/authentication/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/session/ctx-session.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    authentication__tag$mount(tag, {authentication_agent: ctx.censible$authentication_agent});
    tag.on("mount", on$mount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      tag.ctx$update();
    }
  </script>
</ctx-session>