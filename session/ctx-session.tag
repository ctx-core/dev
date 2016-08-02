<ctx-session>
  <a
    class="login-link"
    show="{ctx.onclick__login && !ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.onclick__login}">login</a>
  <a
    class="signup-link"
    show="{ctx.onclick__signup$link && !ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.onclick__signup$link}">signup</a>
  <a
    class="logout-link"
    show="{ctx.onclick__logout && ctx[ctx.agent__authentication.scope[0]]}"
    onclick="{ctx.onclick__logout
    }">logout</a>
  <style>
    ctx-session > * {
      cursor: pointer;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {agent__authentication} from "auth/agent";
    import {mount__authentication} from "ctx-core/auth/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/session/ctx-session.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    mount__authentication(tag, {
      agent__authentication: ctx.agent__authentication});
  </script>
</ctx-session>