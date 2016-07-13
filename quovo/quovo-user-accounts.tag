<quovo-user-accounts
  class="quovo-navigation">
  <title>Accounts</title>
  <x-content class="{
    loading: !ctx.quovo$user$account$$,
    empty: ctx.quovo$user$account$$ && !ctx.quovo$user$account$$.length}">
    <a
      each="{quovo$user$account in ctx.quovo$user$account$$}"
      href="{path__quovo$user$account(ctx, quovo$user$account)}"
      class="{
        selected-maybe: true,
        selected: quovo$user$account.id == ctx.quovo$account$id}"
      onclick="{link__onclick__in}">
      <quovo-account>
        <x-brokerage-name>{quovo$user$account.brokerage_name}</x-brokerage-name>
        <quovo-account-value>{currency__format(quovo$user$account)}</quovo-account-value>
      </quovo-account>
    </a>
  </x-content>
  <style>
    quovo-user-accounts {
      display: -webkit-box;
      display: flex;
      -webkit-flex-direction: column;
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
    quovo-user-accounts > x-content {
      -webkit-flex: auto;
      flex: auto;
      display: block;
      overflow-x: hidden;
      overflow-y: auto;
    }
    quovo-user-accounts > x-content > a {
      display: block;
      padding: 10px;
      border: 1px dotted gray;
      color: #333333;
      text-decoration: none;
    }
    quovo-user-accounts > x-content > a > * {
      display: block;
    }
    quovo-user-accounts > x-content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {
      assign__agent__quovo$user$account$$,
      assign__agent__quovo$account$id} from "ctx-core/quovo/agent";
    import {currency__format} from "ctx-core/currency/lib"
    import {path__quovo$user$account} from "ctx-core/quovo/path";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency__format: currency__format,
            path__quovo$user$account,
            registerElement: [
              "x-content",
              "quovo-account",
              "x-brokerage-name",
              "quovo-account-value"]
          })
        , logPrefix = "ctx-core/quovo/quovo-user-accounts.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    assign__agent__quovo$user$account$$(ctx);
    assign__agent__quovo$account$id(ctx);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.agent__quovo$user$account$$.on("change", quovo$user$account$$__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$user$account$$.off("change", quovo$user$account$$__on$change);
    }
    function quovo$user$account$$__on$change() {
      log(`${logPrefix}|quovo$user$account$$__on$change`);
      tag.update__ctx(...arguments);
    }
  </script>
</quovo-user-accounts>