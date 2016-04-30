<quovo-portfolio-details class="{loading: !ctx.quovo$portfolio}">
  <name title="{ctx.quovo$portfolio.portfolio_name}">{ctx.quovo$portfolio.portfolio_name}</name>
  <type title="{ctx.quovo$portfolio.portfolio_type}">{ctx.quovo$portfolio.portfolio_type}</type>
  <category title="{ctx.quovo$portfolio.portfolio_category}">{ctx.quovo$portfolio.portfolio_category}</category>
  <value title="{currency$format(ctx.quovo$portfolio)}">{currency$format(ctx.quovo$portfolio)}</value>
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
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__ctx_row$$_agent} from "ctx-core/table/lib";
    import {agent$$trigger$change} from "ctx-core/agent/lib";
    import {
      assign__quovo$portfolio$position$$_agent,
      assign__quovo$portfolio_agent} from "./agent";
    import closest from "closest";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            self$update: self$update,
            currency$format: currency$format})
        , logPrefix = "ctx-core/quovo/quovo-portfolio.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__quovo$portfolio$position$$_agent(ctx);
      assign__quovo$portfolio_agent(ctx);
      ctx.quovo$portfolio_agent.on("change", quovo$portfolio_agent$on$change);
      assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = self.ctx;
      ctx.quovo$portfolio_agent.off("change", quovo$portfolio_agent$on$change);
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
</quovo-portfolio-details>