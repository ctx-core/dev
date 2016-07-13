<quovo-user-account-details class="{loading: !ctx.quovo$user$account}">
  <x-brokerage-name>
    <label>Brokerage Name</label>
    <x-value>{ctx.quovo$user$account.brokerage_name}</x-value>
  </x-brokerage-name>
  <quovo-account-value>
    <label>value</label>
    <x-value>{currency__format(ctx.quovo$user$account)}</x-value>
  </quovo-account-value>
  <quovo-account-nickname>
    <label>nickname</label>
    <x-value>{ctx.quovo$user$account.brokerage_name}</x-value>
  </quovo-account-nickname>
  <quovo-account-opened>
    <label>opened</label>
    <x-value>{ctx.quovo$user$account.opened}</x-value>
  </quovo-account-opened>
  <style>
    quovo-user-account-details {
      display: block;
      padding: 10px;
    }
    quovo-user-account-details.loading > * {
      display: none;
    }
    quovo-user-account-details > * {
      display: block;
      overflow: hidden;
      padding-bottom: 10px;
    }
    quovo-user-account-details > * > * {
      float: left;
    }
    quovo-user-account-details > * > label {
      width: 120px;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo$user$account} from "ctx-core/quovo/agent";
    import {currency__format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency__format: currency__format,
            registerElement: [
              "x-brokerage-name",
              "quovo-account-value",
              "quovo-account-nickname",
              "quovo-account-opened",
              "x-value"
            ]})
        , logPrefix = "ctx-core/quovo/quovo-account.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$user$account(ctx);
      ctx.agent__quovo$user$account.on("change", quovo$user$account__on$change);
      tag.update__ctx();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.agent__quovo$user$account.off("change", quovo$user$account__on$change);
    }
    function quovo$user$account__on$change() {
      log(`${logPrefix}|quovo$user$account__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-user-account-details>