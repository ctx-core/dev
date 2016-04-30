<quovo-user-navigation class="quovo-navigation">
  <title>User</title>
  <content class="{loading: !ctx.quovo$user}">
    <a
      href="{path__quovo$user(ctx)}"
      class="dashboard selected-maybe {selected: ctx.route$name__quovo$user}"
      onclick="{link$onclick}">
      <quovo-user>
        <id>{ctx.quovo$user.id}</id>
        <username>{ctx.quovo$user.username}</username>
        <email>{ctx.quovo$user.email}</email>
        <value>{currency$format(ctx.quovo$user)}</value>
      </quovo-user>
    </a>
    <a
      href="{path__quovo$user$sync(ctx)}"
      class="sync {
        selected-maybe: true,
        selected: ctx.route$name__quovo$user$sync}"
      onclick="{link$onclick}">Sync Account(s)</a>
    <quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
  </content>
  <style>
    quovo-user-navigation > content > * {
      display: block;
    }
    quovo-user-navigation > content.loading > * {
      display: none;
    }
    quovo-user-navigation > content > a {
      padding: 10px;
      border: 1px dotted gray;
      color: #111111;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-navigation > content > a > quovo-user {
      display: block;
    }
    quovo-user-navigation > content > a > quovo-user > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
    import {tag$assign__opts,link$onclick} from "ctx-core/tag/lib";
    import {currency$format} from "ctx-core/currency/lib"
    import {assign__quovo$user_agent} from "./agent";
    import {
      path__quovo$user,
      path__quovo$user$sync} from "./path"
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            link$onclick: link$onclick,
            currency$format: currency$format,
            path__quovo$user: path__quovo$user,
            path__quovo$user$sync: path__quovo$user$sync
          })
        , logPrefix = "ctx-core/quovo/quovo-user-navigation.tag";
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
</quovo-user-navigation>