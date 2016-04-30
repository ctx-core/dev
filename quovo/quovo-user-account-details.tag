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
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {agent$$trigger$change} from "ctx-core/agent/lib";
    import {assign__quovo$user$account_agent} from "./agent";
    import closest from "closest";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            currency$format: currency$format})
        , logPrefix = "ctx-core/quovo/quovo-account.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$user$account_agent(ctx);
      ctx.quovo$user$account_agent.on("change", quovo$user$account_agent$on$change);
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx;
      ctx.quovo$user$account_agent.off("change", quovo$user$account_agent$on$change);
    }
    function quovo$user$account_agent$on$change() {
      log(`${logPrefix}|quovo$user$account_agent$on$change`);
      assign__ctx$update();
    }
    function assign__ctx$update() {
      log(`${logPrefix}|assign__ctx$update`);
      let ctx = self.ctx;
      assign(self, {ctx: ctx});
      self$update();
    }
    function self$update() {
      log(`${logPrefix}|self$update`);
      self.update();
    }
  </script>
</quovo-user-account-details>