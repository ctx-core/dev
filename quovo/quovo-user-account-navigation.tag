<quovo-user-account-navigation class="quovo-navigation">
  <title>Account</title>
  <content class="{loading: !ctx.quovo$user$account}">
    <a
      href="{path__quovo$user$account(ctx)}"
      onclick="{app__link$onclick}"
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
      color: #000000;
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
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__quovo$user$account_agent} from "./agent";
    import {path__quovo$user$account} from "./path";
    import {currency$format} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format,
            path__quovo$user$account: path__quovo$user$account
          })
        , logPrefix = "ctx-core/quovo/quovo-user-account-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$user$account_agent(ctx);
      ctx.quovo$user$account_agent.on("change", quovo$user$account$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user$account_agent.off("change", quovo$user$account$on$change);
    }
    function quovo$user$account$on$change() {
      log(`${logPrefix}|quovo$user$account$on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-user-account-navigation>