<quovo-positions class="{
  loading: !ctx.quovo$position$$,
  empty: ctx.quovo$position$$ && !ctx.quovo$position$$.length}">
  <headers show="{ctx.quovo$position$$.length}">
    <market-code></market-code>
    <ticker>Ticker</ticker>
    <ticker-name>Name</ticker-name>
    <quantity>Quantity</quantity>
    <value>Value</value>
    <security-type>Security Type</security-type>
    <asset-class>Asset Class</asset-class>
  </headers>
  <quovo-position
    each="{quovo$position in ctx.quovo$position$$}">
    <market-code title="{quovo$position.market_code}">{quovo$position.market_code}</market-code>
    <ticker title="{quovo$position.ticker}">{quovo$position.ticker}</ticker>
    <ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</ticker-name>
    <quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quantity>
    <value title="{currency$format(quovo$position)}">{currency$format(quovo$position)}</value>
    <security-type title="{quovo$position.security_type}">{quovo$position.security_type}</security-type>
    <asset-class title="{quovo$position.asset_class}">{quovo$position.asset_class}</asset-class>
  </quovo-position>
  <style>
    quovo-positions {
      display: block;
      padding: 10px;
    }
    quovo-positions > * {
      display: block;
    }
    quovo-positions > * {
      display: block;
      overflow: hidden;
      border: 1px dotted #111111;
      padding: 10px;
      clear: both;
    }
    quovo-positions > * > * {
      display: block;
      float: left;
      width: 100px;
      min-height: 1px;
      height: 1.25em;
      line-height: 1.25;
      overflow: hidden;
    }
    quovo-positions > headers > * {
      font-weight: bold;
    }
    quovo-positions > * > market-code {
      width: 40px;
    }
    quovo-positions > * > ticker-name {
      width: 300px;
    }
    quovo-positions > * > security-type {
      width: 200px;
    }
    quovo-positions > * > asset-class {
      width: 200px;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {
      assign__quovo$position$$_agent,
      assign__quovo$portfolio$position$$_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            currency$format: currency$format})
        , quovo$portfolio$id = parseInt(opts.quovo_portfolio_id)
        , logPrefix = "ctx-core/quovo/quovo-positions.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      if (quovo$portfolio$id) {
        assign__quovo$position$$_agent(ctx);
        ctx.quovo$position$$_agent.on("change", quovo$position$$_agent$on$change);
      } else {
        assign__quovo$portfolio$position$$_agent(ctx);
        ctx.quovo$portfolio$position$$_agent.on("change", quovo$portfolio$position$$_agent$on$change);
      }
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx;
      if (quovo$portfolio$id) {
        ctx.quovo$position$$_agent.off("change", quovo$position$$_agent$on$change);
      } else {
        ctx.quovo$portfolio$position$$_agent.off("change", quovo$portfolio$position$$_agent$on$change);
      }
    }
    function quovo$position$$_agent$on$change() {
      log(`${logPrefix}|quovo$position$$_agent$on$change`);
      assign__ctx$update();
    }
    function quovo$portfolio$position$$_agent$on$change() {
      log(`${logPrefix}|quovo$portfolio$position$$_agent$on$change`);
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
</quovo-positions>