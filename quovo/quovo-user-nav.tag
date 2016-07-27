<quovo-user-nav class="quovo-nav">
  <title>User</title>
  <div class="{loading: !ctx.quovo__user}">
    <a
      href="{path__quovo__user(ctx)}"
      class="dashboard selected-maybe {selected: ctx.route$name__quovo__user}"
      onclick="{link__onclick__in}">
      <quovo-user>
        <quovo-user-id>{ctx.quovo__user.id}</quovo-user-id>
        <quovo-user-username>{ctx.quovo__user.username}</quovo-user-username>
        <quovo-user-email>{ctx.quovo__user.email}</quovo-user-email>
        <quovo-user-value>{format__currency(ctx.quovo__user.value)}</quovo-user-value>
      </quovo-user>
    </a>
    <a
      href="{path__quovo__user$sync(ctx)}"
      class="sync {
        selected-maybe: true,
        selected: ctx.route$name__quovo__user$sync}"
      onclick="{link__onclick__in}">Sync Account(s)</a>
    <quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
  </div>
  <style>
    quovo-user-nav > div > * {
      display: block;
    }
    quovo-user-nav > div.loading > * {
      display: none;
    }
    quovo-user-nav > div > a {
      padding: 10px;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-nav > div > a > quovo-user {
      display: block;
    }
    quovo-user-nav > div > a > quovo-user > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {mount__currency} from "ctx-core/currency/tag"
    import {ensure__agent__quovo__user} from "ctx-core/quovo/agent";
    import {
      path__quovo__user,
      path__quovo__user$sync} from "ctx-core/quovo/path"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            path__quovo__user: path__quovo__user,
            path__quovo__user$sync: path__quovo__user$sync,
            registerElement: [
              "quovo-user",
              "quovo-user-id",
              "quovo-user-username",
              "quovo-user-email",
              "quovo-user-value"]})
        , logPrefix = "ctx-core/quovo/quovo-user-nav.tag";
    mount__currency(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      ensure__agent__quovo__user(ctx);
      ctx.agent__quovo__user.on("change", quovo__user__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo__user.off("change", quovo__user__on$change);
    }
    function quovo__user__on$change() {
      log(`${logPrefix}|quovo__user__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-user-nav>