<quovo-user-account-navigation class="quovo-navigation">
  <title>Account</title>
  <x-content class="{loading: !ctx.quovo__user__account}">
    <a
      href="{path__quovo__user__account(ctx)}"
      onclick="{link__onclick__in}"
      class="selected-maybe {selected: ctx.route$name__quovo__user__account}">
      <quovo-account>
        <brokerage-name>{ctx.quovo__user__account.brokerage_name}</brokerage-name>
        <value>{format__currency(ctx.quovo__user__account.value)}</value>
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
    import {ensure__agent__quovo__user__account} from "ctx-core/quovo/agent";
    import {path__quovo__user__account} from "ctx-core/quovo/path";
    import {format__currency} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            format__currency: format__currency,
            path__quovo__user__account: path__quovo__user__account,
            registerElement: ["x-content"]
          })
        , logPrefix = "ctx-core/quovo/quovo-user-account-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      ensure__agent__quovo__user__account(ctx);
      ctx.agent__quovo__user__account.on("change", quovo__user__account__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo__user__account.off("change", quovo__user__account__on$change);
    }
    function quovo__user__account__on$change() {
      log(`${logPrefix}|quovo__user__account__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-user-account-navigation>