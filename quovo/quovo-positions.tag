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
    <quovo-position-value title="{currency__format(quovo$position)}">{currency__format(quovo$position)}</quovo-position-value>
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
    import {tag__assign} from "ctx-core/tag/lib";
    import {
      assign__agent__quovo$position$$,
      assign__agent__quovo$portfolio$position$$} from "ctx-core/quovo/agent";
    import {currency__format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency__format: currency__format})
        , quovo$portfolio$id = parseInt(opts.quovo_portfolio_id)
        , logPrefix = "ctx-core/quovo/quovo-positions.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      if (quovo$portfolio$id) {
        assign__agent__quovo$position$$(ctx);
        ctx.agent__quovo$position$$.on("change", quovo$position$$__on$change);
      } else {
        assign__agent__quovo$portfolio$position$$(ctx);
        ctx.agent__quovo$portfolio$position$$.on("change", quovo$portfolio$position$$__on$change);
      }
      tag.update__ctx();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      if (quovo$portfolio$id) {
        ctx.agent__quovo$position$$.off("change", quovo$position$$__on$change);
      } else {
        ctx.agent__quovo$portfolio$position$$.off("change", quovo$portfolio$position$$__on$change);
      }
    }
    function quovo$position$$__on$change() {
      log(`${logPrefix}|quovo$position$$__on$change`);
      tag.update__ctx();
    }
    function quovo$portfolio$position$$__on$change() {
      log(`${logPrefix}|quovo$portfolio$position$$__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-positions>