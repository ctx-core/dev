<quovo-user-navigation class="quovo-navigation">
  <title>User</title>
  <x-content class="{loading: !ctx.quovo$user}">
    <a
      href="{path__quovo$user(ctx)}"
      class="dashboard selected-maybe {selected: ctx.route$name__quovo$user}"
      onclick="{app__link$onclick}">
      <quovo-user>
        <quovo-user-id>{ctx.quovo$user.id}</quovo-user-id>
        <quovo-user-username>{ctx.quovo$user.username}</quovo-user-username>
        <quovo-user-email>{ctx.quovo$user.email}</quovo-user-email>
        <quovo-user-value>{currency$format(ctx.quovo$user)}</quovo-user-value>
      </quovo-user>
    </a>
    <a
      href="{path__quovo$user$sync(ctx)}"
      class="sync {
        selected-maybe: true,
        selected: ctx.route$name__quovo$user$sync}"
      onclick="{app__link$onclick}">Sync Account(s)</a>
    <quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
  </x-content>
  <style>
    quovo-user-navigation > x-content > * {
      display: block;
    }
    quovo-user-navigation > x-content.loading > * {
      display: none;
    }
    quovo-user-navigation > x-content > a {
      padding: 10px;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-navigation > x-content > a > quovo-user {
      display: block;
    }
    quovo-user-navigation > x-content > a > quovo-user > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {currency$format} from "ctx-core/currency/lib"
    import {assign__agent__quovo$user} from "ctx-core/quovo/agent";
    import {
      path__quovo$user,
      path__quovo$user$sync} from "ctx-core/quovo/path"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency$format: currency$format,
            path__quovo$user: path__quovo$user,
            path__quovo$user$sync: path__quovo$user$sync,
            registerElement: [
              "x-content",
              "quovo-user",
              "quovo-user-id",
              "quovo-user-username",
              "quovo-user-email",
              "quovo-user-value"]})
        , logPrefix = "ctx-core/quovo/quovo-user-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$user(ctx);
      ctx.agent__quovo$user.on("change", quovo$user__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$user.off("change", quovo$user__on$change);
    }
    function quovo$user__on$change() {
      log(`${logPrefix}|quovo$user__on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-user-navigation>