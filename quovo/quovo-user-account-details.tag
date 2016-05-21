<quovo-user-account-details class="{loading: !ctx.quovo$user$account}">
  <brokerage-name>
    <label>Brokerage Name</label>
    <value>{ctx.quovo$user$account.brokerage_name}</value>
  </brokerage-name>
  <value>
    <label>value</label>
    <value>{currency$format(ctx.quovo$user$account)}</value>
  </value>
  <nickname>
    <label>nickname</label>
    <value>{ctx.quovo$user$account.brokerage_name}</value>
  </nickname>
  <opened>
    <label>opened</label>
    <value>{ctx.quovo$user$account.opened}</value>
  </opened>
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
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {agent$$trigger$change} from "ctx-core/agent/lib";
    import {assign__quovo$user$account_agent} from "./agent";
    import closest from "closest";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format})
        , logPrefix = "ctx-core/quovo/quovo-account.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$user$account_agent(ctx);
      ctx.quovo$user$account_agent.on("change", quovo$user$account_agent$on$change);
      tag.assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.quovo$user$account_agent.off("change", quovo$user$account_agent$on$change);
    }
    function quovo$user$account_agent$on$change() {
      log(`${logPrefix}|quovo$user$account_agent$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-user-account-details>