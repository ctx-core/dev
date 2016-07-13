<quovo-user-account-navigation class="quovo-navigation">
  <title>Account</title>
  <x-content class="{loading: !ctx.quovo$user$account}">
    <a
      href="{path__quovo$user$account(ctx)}"
      onclick="{link__onclick__in}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account}">
      <quovo-account>
        <brokerage-name>{ctx.quovo$user$account.brokerage_name}</brokerage-name>
        <value>{currency__format(ctx.quovo$user$account)}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </x-content>
  <style>
    quovo-user-account-navigation {
      display: block;
    }
    quovo-user-account-navigation > x-content > * {
      display: block;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-account-navigation > x-content.loading > * {
      display: none;
    }
    quovo-user-account-navigation > x-content > a {
      padding: 10px;
    }
    quovo-user-account-navigation > x-content > a > * {
      display: block;
    }
    quovo-user-account-navigation > x-content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo$user$account} from "ctx-core/quovo/agent";
    import {path__quovo$user$account} from "ctx-core/quovo/path";
    import {currency__format} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency__format: currency__format,
            path__quovo$user$account: path__quovo$user$account,
            registerElement: ["x-content"]
          })
        , logPrefix = "ctx-core/quovo/quovo-user-account-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$user$account(ctx);
      ctx.agent__quovo$user$account.on("change", quovo$user$account__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$user$account.off("change", quovo$user$account__on$change);
    }
    function quovo$user$account__on$change() {
      log(`${logPrefix}|quovo$user$account__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-user-account-navigation>