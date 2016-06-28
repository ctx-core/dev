<quovo-positions class="{
  loading: !ctx.quovo$position$$,
  empty: ctx.quovo$position$$ && !ctx.quovo$position$$.length}">
  <x-headers show="{ctx.quovo$position$$.length}">
    <x-market-code></x-market-code>
    <x-ticker>Ticker</x-ticker>
    <x-ticker-name>Name</x-ticker-name>
    <quovo-position-quantity>Quantity</quovo-position-quantity>
    <quovo-position-value>Value</quovo-position-value>
    <quovo-security-type>Security Type</quovo-security-type>
    <quovo-asset-class>Asset Class</quovo-asset-class>
  </x-headers>
  <quovo-position
    each="{quovo$position in ctx.quovo$position$$}">
    <x-market-code title="{quovo$position.market_code}">{quovo$position.market_code}</x-market-code>
    <x-ticker title="{quovo$position.ticker}">{quovo$position.ticker}</x-ticker>
    <x-ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</x-ticker-name>
    <quovo-position-quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quovo-position-quantity>
    <quovo-position-value title="{currency$format(quovo$position)}">{currency$format(quovo$position)}</quovo-position-value>
    <quovo-security-type title="{quovo$position.security_type}">{quovo$position.security_type}</quovo-security-type>
    <quovo-asset-class title="{quovo$position.asset_class}">{quovo$position.asset_class}</quovo-asset-class>
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
    quovo-positions > * > x-market-code {
      width: 40px;
    }
    quovo-positions > * > x-ticker-name {
      width: 300px;
    }
    quovo-positions > * > quovo-security-type {
      width: 200px;
    }
    quovo-positions > * > quovo-asset-class {
      width: 200px;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {
      assign__quovo$position$$_agent,
      assign__quovo$portfolio$position$$_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format})
        , quovo$portfolio$id = parseInt(opts.quovo_portfolio_id)
        , logPrefix = "ctx-core/quovo/quovo-positions.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      if (quovo$portfolio$id) {
        assign__quovo$position$$_agent(ctx);
        ctx.quovo$position$$_agent.on("change", quovo$position$$$on$change);
      } else {
        assign__quovo$portfolio$position$$_agent(ctx);
        ctx.quovo$portfolio$position$$_agent.on("change", quovo$portfolio$position$$$on$change);
      }
      tag.ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      if (quovo$portfolio$id) {
        ctx.quovo$position$$_agent.off("change", quovo$position$$$on$change);
      } else {
        ctx.quovo$portfolio$position$$_agent.off("change", quovo$portfolio$position$$$on$change);
      }
    }
    function quovo$position$$$on$change() {
      log(`${logPrefix}|quovo$position$$$on$change`);
      tag.ctx$update();
    }
    function quovo$portfolio$position$$$on$change() {
      log(`${logPrefix}|quovo$portfolio$position$$$on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-positions>