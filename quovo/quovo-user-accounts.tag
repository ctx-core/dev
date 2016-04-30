<quovo-user-accounts
  class="quovo-navigation">
  <title>Accounts</title>
  <content class="{
    loading: !ctx.quovo$user$account$$,
    empty: ctx.quovo$user$account$$ && !ctx.quovo$user$account$$.length}">
    <a
      each="{quovo$user$account in ctx.quovo$user$account$$}"
      href="{path__quovo$user$account(ctx, quovo$user$account)}"
      class="{
        selected-maybe: true,
        selected: quovo$user$account.id == ctx.quovo$account$id}"
      onclick="{link$onclick}">
      <quovo-account>
        <brokerage-name>{quovo$user$account.brokerage_name}</brokerage-name>
        <value>{currency$format(quovo$user$account)}</value>
      </quovo-account>
    </a>
  </content>
  <style>
    quovo-user-accounts {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
    }
    quovo-user-accounts.loading:before,quovo-user-accounts.empty:before {
      padding: 10px 0;
    }
    quovo-user-accounts.empty:before {
      content: "No Accounts";
    }
    quovo-user-accounts > content {
      flex: auto;
      display: block;
      overflow-x: hidden;
      overflow-y: auto;
    }
    quovo-user-accounts > content > a {
      display: block;
      padding: 10px;
      border: 1px dotted gray;
      color: #333333;
      text-decoration: none;
    }
    quovo-user-accounts > content > a > * {
      display: block;
    }
    quovo-user-accounts > content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts,link$onclick} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {
      assign__quovo$user$account$$_agent,
      assign__quovo$account$id_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {path__quovo$user$account} from "./path";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            currency$format: currency$format,
            link$onclick: link$onclick,
            path__quovo$user$account
          })
        , logPrefix = "ctx-core/quovo/quovo-user-accounts.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$user$account$$_agent(ctx);
      assign__quovo$account$id_agent(ctx);
      const quovo$user$account$$_agent = ctx.quovo$user$account$$_agent;
      quovo$user$account$$_agent.on("change", quovo$user$account$$_agent$change);
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx
          , quovo$user$account$$_agent = ctx.quovo$user$account$$_agent;
      quovo$user$account$$_agent.off("change", quovo$user$account$$_agent$change);
    }
    function quovo$user$account$$_agent$change() {
      log(`${logPrefix}|quovo$user$account$$_agent$on$change`);
      assign__ctx$update(...arguments);
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
</quovo-user-accounts>