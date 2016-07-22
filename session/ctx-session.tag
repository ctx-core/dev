<ctx-session>
  <a
    class="login-link"
    show="{ctx.login$link__onclick && !ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.login$link__onclick}">login</a>
  <a
    class="signup-link"
    show="{ctx.signup$link__onclick && !ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.signup$link__onclick}">signup</a>
  <a
    class="logout-link"
    show="{ctx.logout$link__onclick && ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.logout$link__onclick
    }">logout</a>
  <style>
    ctx-session > * {
      cursor: pointer;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {ensure__agent__authentication} from "auth/agent";
    import {mount__authentication} from "ctx-core/auth/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/session/ctx-session.tag";
    log(logPrefix);
    mount__authentication(tag, {agent__authentication: ctx.agent__authentication});
  </script>
</ctx-session>