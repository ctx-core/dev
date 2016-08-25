<quovo-account-portfolios class="quovo-nav">
  <title>Portfolios</title>
  <div class="{loading: !ctx.quovo__account__portfolios}">
    <a
      each="{quovo__portfolio in ctx.quovo__account__portfolios}"
      href="{path__quovo__user__account$portfolio(ctx, quovo__portfolio)}"
      class="selected-maybe {selected: quovo__portfolio.id === ctx.quovo__portfolio_id}"
      onclick="{onclick__navigate}">
      <quovo-portfolio>
        <quovo-portfolio-name title="{quovo__portfolio.portfolio_name}">{quovo__portfolio.portfolio_name}</quovo-portfolio-name>
        <quovo-portfolio-type title="{quovo__portfolio.portfolio_type}">{quovo__portfolio.portfolio_type}</quovo-portfolio-type>
        <quovo-portfolio-category title="{quovo__portfolio.portfolio_category}">{quovo__portfolio.portfolio_category}</quovo-portfolio-category>
        <quovo-portfolio-value title="{format__currency(quovo__portfolio.value)}">{format__currency(quovo__portfolio.value)}</quovo-portfolio-value>
      </quovo-portfolio>
    </a>
  </div>
  <style>
    quovo-account-portfolios {
      display: -webkit-box;
      display: flex;
    }
    quovo-account-portfolios > div > a {
      display: block;
      padding: 10px;
      overflow: hidden;
      color: #333333;
      text-decoration: none;
    }
    quovo-account-portfolios > div > a > * {
      display: block;
    }
    quovo-account-portfolios > div > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {
      quovo__account__portfolios__agent,
      quovo__portfolio_id__agent} from "ctx-core/quovo/agent";
    import {path__quovo__user__account$portfolio} from "ctx-core/quovo/path";
    import {mount__currency} from "ctx-core/currency/tag"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            path__quovo__user__account$portfolio: path__quovo__user__account$portfolio,
            registerElement: [
              "quovo-portfolio",
              "quovo-portfolio-name",
              "quovo-portfolio-type",
              "quovo-portfolio-category",
              "quovo-portfolio-value"
            ]
          })
        , logPrefix = "ctx-core/quovo/quovo-account-portfolios.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    mount__currency(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      quovo__account__portfolios__agent(ctx);
      quovo__portfolio_id__agent(ctx);
      ctx.quovo__account__portfolios__agent.on("change", on$change__quovo__account__portfolios);
      ctx.quovo__portfolio_id__agent.on("change", on$change__quovo__portfolio);
      tag.update__ctx();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo__account__portfolios__agent.off("change", on$change__quovo__account__portfolios);
      ctx.quovo__portfolio_id__agent.off("change", on$change__quovo__portfolio);
    }
    function on$change__quovo__account__portfolios() {
      log(`${logPrefix}|on$change__quovo__account__portfolios`);
      tag.update__ctx();
    }
    function on$change__quovo__portfolio() {
      log(`${logPrefix}|on$change__quovo__portfolio`);
      tag.update__ctx();
    }
  </script>
</quovo-account-portfolios>