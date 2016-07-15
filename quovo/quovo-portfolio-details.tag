<quovo-portfolio-details class="{loading: !ctx.quovo__portfolio}">
  <quovo-portfolio-name title="{ctx.quovo__portfolio.portfolio_name}">{ctx.quovo__portfolio.portfolio_name}</quovo-portfolio-name>
  <quovo-portfolio-type title="{ctx.quovo__portfolio.portfolio_type}">{ctx.quovo__portfolio.portfolio_type}</quovo-portfolio-type>
  <quovo-portfolio-category title="{ctx.quovo__portfolio.portfolio_category}">{ctx.quovo__portfolio.portfolio_category}</quovo-portfolio-category>
  <quovo-portfolio-value title="{currency__format(ctx.quovo__portfolio)}">{currency__format(ctx.quovo__portfolio)}</quovo-portfolio-value>
  <style>
    quovo-portfolio-details {
      display: block;
      padding: 10px;
    }
    quovo-portfolio-details > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {
      assign__agent__quovo__portfolio__positions,
      assign__agent__quovo__portfolio} from "ctx-core/quovo/agent";
    import {currency__format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency__format: currency__format,
            registerElement: [
              "quovo-portfolio-name",
              "quovo-portfolio-type",
              "quovo-portfolio-category",
              "quovo-portfolio-value"
            ]})
        , logPrefix = "ctx-core/quovo/quovo-portfolio.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo__portfolio__positions(ctx);
      assign__agent__quovo__portfolio(ctx);
      ctx.agent__quovo__portfolio.on("change", quovo__portfolio__on$change);
      tag.update__ctx();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.agent__quovo__portfolio.off("change", quovo__portfolio__on$change);
    }
    function quovo__portfolio__on$change() {
      log(`${logPrefix}|quovo__portfolio__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-portfolio-details>