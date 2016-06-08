<quovo-portfolio-history class="{
  loading: !ctx.quovo$portfolio$history,
  empty: ctx.quovo$portfolio$history && !ctx.quovo$portfolio$history.length}">
  <headers show="{ctx.quovo$portfolio$history.length}">
    <date>Date</date>
    <tran-type>Tran Type</tran-type>
    <market-code></market-code>
    <ticker>Ticker</ticker>
    <ticker-name>Name</ticker-name>
    <quantity>Quantity</quantity>
    <value>Value</value>
  </headers>
  <quovo-position
    each="{quovo$position in ctx.quovo$portfolio$history}">
    <date title="{quovo$position.date}">{quovo$position.date}</date>
    <tran-type title="{tran_type$map[quovo$position.tran_type]}">{tran_type$map[quovo$position.tran_type]}</tran-type>
    <market-code title="{quovo$position.market_code}">{quovo$position.market_code}</market-code>
    <ticker title="{quovo$position.ticker}">{quovo$position.ticker}</ticker>
    <ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</ticker-name>
    <quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quantity>
    <value title="{currency$format(quovo$position)}">{currency$format(quovo$position)}</value>
  </quovo-position>
  <style>
    quovo-portfolio-history {
      display: table;
      border-spacing: 10px;
      padding: 10px;
    }
    quovo-portfolio-history.empty:before {
      content: "No Transaction History";
    }
    quovo-portfolio-history > * {
      display: block;
    }
    quovo-portfolio-history > * {
      display: block;
      overflow: hidden;
      border: 1px dotted #111111;
      padding: 10px;
      clear: both;
    }
    quovo-portfolio-history > * > * {
      display: block;
      float: left;
      width: 100px;
      min-height: 1px;
      height: 1.25em;
      line-height: 1.25;
      overflow: hidden;
    }
    quovo-portfolio-history > headers {
      display: table-header-group;
    }
    quovo-portfolio-history > headers > * {
      display: table-cell;
      font-weight: bold;
    }
    quovo-portfolio-history > * {
      display: table-row;
      padding: 10px 0;
      border-top: 1px dashed #000000;
      overflow: hidden;
    }
    quovo-portfolio-history > * > * {
      display: table-cell;
    }
    quovo-portfolio-history > * > market-code {
      min-width: 40px;
    }
    quovo-portfolio-history > * > ticker-name {
      min-width: 300px;
    }
    quovo-portfolio-history > * > security-type {
      min-width: 200px;
    }
    quovo-portfolio-history > * > asset-class {
      min-width: 200px;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {tran_type$map} from "./lib";
    import {assign__quovo$portfolio$history_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format,
            tran_type$map: tran_type$map
          })
        , quovo$portfolio$id = parseInt(opts.quovo_portfolio_id)
        , logPrefix = "ctx-core/quovo/quovo-portfolio-history.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$portfolio$history_agent(ctx);
      ctx.quovo$portfolio$history_agent.on("change", quovo$portfolio$history_agent$on$change);
      tag.assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.quovo$portfolio$history_agent.off("change", quovo$portfolio$history_agent$on$change);
    }
    function quovo$portfolio$history_agent$on$change() {
      log(`${logPrefix}|quovo$portfolio$history_agent$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-portfolio-history>