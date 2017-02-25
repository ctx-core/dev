<ctx-session>
  <a
    class="login-link {
      present:
        ctx.onclick__login
        && !ctx[$ctx('authentication__agent.scope', 0)]
    }"
    onclick="{ctx.onclick__login}">login</a>
  <a
    class="signup-link {
      present:
        ctx.onclick__signup
        && !ctx[$ctx('authentication__agent.scope', 0)]
    }"
    onclick="{ctx.onclick__signup}">signup</a>
  <a
    class="logout-link {
      present:
        ctx.onclick__logout
        && !ctx[$ctx('authentication__agent.scope', 0)]
    }"
    onclick="{ctx.onclick__logout}">logout</a>
  <style type="text/css">
    ctx-session > * {
      display: none;
      cursor: pointer;
    }
    ctx-session > .present {
      display: block;
    }
  </style>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {assign} from 'ctx-core/object/lib'
    import {authentication__agent} from 'auth/agent'
    import {mount__authentication} from 'ctx-core/auth/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/session/ctx-session.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__authentication(tag, {authentication__agent})
  </script>
</ctx-session>