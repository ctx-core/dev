<quovo-portfolio-navigation class="quovo-navigation">
  <title>Portfolio</title>
  <content>
    <a
      href="{path__quovo$user$account$portfolio(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account$portfolio}"
      onclick="{link$onclick}">Positions</a>
    <a
      href="{path__quovo$user$account$portfolio$history(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account$portfolio$history}"
      onclick="{link$onclick}"
    >Transaction History</a>
  </content>
  <style>
    quovo-portfolio-navigation > content > * {
      display: block;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-portfolio-navigation > content > a {
      padding: 10px;
    }
  </style>
  <script type="text/babel">
    import {fn$tag,link$onclick} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__quovo$portfolio_agent} from "./agent";
    import {
      path__quovo$user$account$portfolio,
      path__quovo$user$account$portfolio$history} from "./path";
    import {currency$format} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
            link$onclick: link$onclick,
            currency$format: currency$format,
            path__quovo$user$account$portfolio: path__quovo$user$account$portfolio,
            path__quovo$user$account$portfolio$history: path__quovo$user$account$portfolio$history
          })
        , logPrefix = "ctx-core/quovo/quovo-portfolio-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$portfolio_agent(ctx);
      ctx.quovo$portfolio_agent.on("change", quovo$portfolio_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$portfolio_agent.off("change", quovo$portfolio_agent$on$change);
    }
    function quovo$portfolio_agent$on$change() {
      log(`${logPrefix}|quovo$portfolio_agent$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-portfolio-navigation>