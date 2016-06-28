<quovo-user-account-details class="{loading: !ctx.quovo$user$account}">
  <x-brokerage-name>
    <label>Brokerage Name</label>
    <x-value>{ctx.quovo$user$account.brokerage_name}</x-value>
  </x-brokerage-name>
  <quovo-account-value>
    <label>value</label>
    <x-value>{currency$format(ctx.quovo$user$account)}</x-value>
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
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__quovo$user$account_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format,
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
      assign__quovo$user$account_agent(ctx);
      ctx.quovo$user$account_agent.on("change", quovo$user$account$on$change);
      tag.ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.quovo$user$account_agent.off("change", quovo$user$account$on$change);
    }
    function quovo$user$account$on$change() {
      log(`${logPrefix}|quovo$user$account$on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-user-account-details>