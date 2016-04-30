<quovo-account-portfolios class="quovo-navigation">
  <title>Portfolios</title>
  <content class="{loading: !ctx.quovo$account$portfolio$$}">
    <a
      each="{quovo$portfolio in ctx.quovo$account$portfolio$$}"
      href="{path__quovo$user$account$portfolio(ctx, quovo$portfolio)}"
      class="selected-maybe {selected: quovo$portfolio.id === ctx.quovo$portfolio$id}"
      onclick="{link$onclick}">
      <quovo-portfolio>
        <name title="{quovo$portfolio.portfolio_name}">{quovo$portfolio.portfolio_name}</name>
        <type title="{quovo$portfolio.portfolio_type}">{quovo$portfolio.portfolio_type}</type>
        <category title="{quovo$portfolio.portfolio_category}">{quovo$portfolio.portfolio_category}</category>
        <value title="{currency$format(quovo$portfolio)}">{currency$format(quovo$portfolio)}</value>
      </quovo-portfolio>
    </a>
  </content>
  <style>
    quovo-account-portfolios {
      display: flex;
    }
    quovo-account-portfolios > content > a {
      display: block;
      padding: 10px;
      overflow: hidden;
      color: #333333;
      text-decoration: none;
    }
    quovo-account-portfolios > content > a > * {
      display: block;
    }
    quovo-account-portfolios > content > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts,link$onclick} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {agent$$trigger$change} from "ctx-core/agent/lib";
    import {
      assign__quovo$account$portfolio$$_agent,
      assign__quovo$portfolio_agent} from "./agent";
    import {path__quovo$user$account$portfolio} from "./path";
    import closest from "closest";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            currency$format: currency$format,
            path__quovo$user$account$portfolio: path__quovo$user$account$portfolio,
            link$onclick: link$onclick
          })
        , logPrefix = "ctx-core/quovo/quovo-account-portfolios.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$account$portfolio$$_agent(ctx);
      assign__quovo$portfolio_agent(ctx);
      ctx.quovo$account$portfolio$$_agent.on("change", quovo$account$portfolio$$_agent$on$change);
      ctx.quovo$portfolio_agent.on("change", quovo$portfolio_agent$on$change);
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx;
      ctx.quovo$account$portfolio$$_agent.off("change", quovo$account$portfolio$$_agent$on$change);
      ctx.quovo$portfolio_agent.off("change", quovo$portfolio_agent$on$change);
    }
    function quovo$account$portfolio$$_agent$on$change() {
      log(`${logPrefix}|quovo$account$portfolio$$_agent$on$change`);
      assign__ctx$update();
    }
    function quovo$portfolio_agent$on$change() {
      log(`${logPrefix}|quovo$portfolio_agent$on$change`);
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
</quovo-account-portfolios>