<quovo-account-portfolios class="quovo-navigation">
  <title>Portfolios</title>
  <x-content class="{loading: !ctx.quovo$account$portfolio$$}">
    <a
      each="{quovo$portfolio in ctx.quovo$account$portfolio$$}"
      href="{path__quovo$user$account$portfolio(ctx, quovo$portfolio)}"
      class="selected-maybe {selected: quovo$portfolio.id === ctx.quovo$portfolio$id}"
      onclick="{app__link$onclick}">
      <quovo-portfolio>
        <quovo-portfolio-name title="{quovo$portfolio.portfolio_name}">{quovo$portfolio.portfolio_name}</quovo-portfolio-name>
        <quovo-portfolio-type title="{quovo$portfolio.portfolio_type}">{quovo$portfolio.portfolio_type}</quovo-portfolio-type>
        <quovo-portfolio-category title="{quovo$portfolio.portfolio_category}">{quovo$portfolio.portfolio_category}</quovo-portfolio-category>
        <quovo-portfolio-value title="{currency$format(quovo$portfolio)}">{currency$format(quovo$portfolio)}</quovo-portfolio-value>
      </quovo-portfolio>
    </a>
  </x-content>
  <style>
    quovo-account-portfolios {
      display: -webkit-box;
      display: flex;
    }
    quovo-account-portfolios > x-content > a {
      display: block;
      padding: 10px;
      overflow: hidden;
      color: #333333;
      text-decoration: none;
    }
    quovo-account-portfolios > x-content > a > * {
      display: block;
    }
    quovo-account-portfolios > x-content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {
      assign__quovo$account$portfolio$$_agent,
      assign__quovo$portfolio_agent} from "./agent";
    import {path__quovo$user$account$portfolio} from "./path";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            currency$format: currency$format,
            path__quovo$user$account$portfolio: path__quovo$user$account$portfolio,
            registerElement: [
              "x-content",
              "quovo-portfolio",
              "quovo-portfolio-name",
              "quovo-portfolio-type",
              "quovo-portfolio-category",
              "quovo-portfolio-value"
            ]
          })
        , logPrefix = "ctx-core/quovo/quovo-account-portfolios.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$account$portfolio$$_agent(ctx);
      assign__quovo$portfolio_agent(ctx);
      ctx.quovo$account$portfolio$$_agent.on("change", quovo$account$portfolio$$$on$change);
      ctx.quovo$portfolio_agent.on("change", quovo$portfolio$on$change);
      tag.ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx;
      ctx.quovo$account$portfolio$$_agent.off("change", quovo$account$portfolio$$$on$change);
      ctx.quovo$portfolio_agent.off("change", quovo$portfolio$on$change);
    }
    function quovo$account$portfolio$$$on$change() {
      log(`${logPrefix}|quovo$account$portfolio$$$on$change`);
      tag.ctx$update();
    }
    function quovo$portfolio$on$change() {
      log(`${logPrefix}|quovo$portfolio$on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-account-portfolios>