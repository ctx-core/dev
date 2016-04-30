<quovo-user-account-navigation class="quovo-navigation">
  <title>Account</title>
  <content class="{loading: !ctx.quovo$user$account}">
    <a
      href="{path__quovo$user$account(ctx)}"
      onclick="{link$onclick}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account}">
      <quovo-account>
        <brokerage-name>{ctx.quovo$user$account.brokerage_name}</brokerage-name>
        <value>{currency$format(ctx.quovo$user$account)}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </content>
  <style>
    quovo-user-account-navigation {
      display: block;
    }
    quovo-user-account-navigation > content > * {
      display: block;
      border: 1px dotted gray;
      color: #111111;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-account-navigation > content.loading > * {
      display: none;
    }
    quovo-user-account-navigation > content > a {
      padding: 10px;
    }
    quovo-user-account-navigation > content > a > * {
      display: block;
    }
    quovo-user-account-navigation > content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {assign} from "ctx-core/object/lib";
    import {tag$assign__opts,link$onclick} from "ctx-core/tag/lib";
    import {assign__quovo$user$account_agent} from "./agent";
    import {path__quovo$user$account} from "./path";
    import {currency$format} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            link$onclick: link$onclick,
            currency$format: currency$format,
            path__quovo$user$account: path__quovo$user$account
          })
        , logPrefix = "ctx-core/quovo/quovo-user-account-navigation.tag";
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$user$account_agent(ctx);
      ctx.quovo$user$account_agent.on("change", quovo$user$account_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user$account_agent.off("change", quovo$user$account_agent$on$change);
    }
    function quovo$user$account_agent$on$change() {
      log(`${logPrefix}|quovo$user$account_agent$on$change`);
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
</quovo-user-account-navigation>