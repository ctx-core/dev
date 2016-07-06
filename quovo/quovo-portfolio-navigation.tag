<quovo-portfolio-navigation class="quovo-navigation">
  <title>Portfolio</title>
  <x-content>
    <a
      href="{path__quovo$user$account$portfolio(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account$portfolio}"
      onclick="{app__link$onclick}">Positions</a>
    <a
      href="{path__quovo$user$account$portfolio$history(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo$user$account$portfolio$history}"
      onclick="{app__link$onclick}"
    >Transaction History</a>
  </x-content>
  <style>
    quovo-portfolio-navigation > x-content > * {
      display: block;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-portfolio-navigation > x-content > a {
      padding: 10px;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo$portfolio} from "ctx-core/quovo/agent";
    import {
      path__quovo$user$account$portfolio,
      path__quovo$user$account$portfolio$history} from "ctx-core/quovo/path";
    import {currency$format} from "ctx-core/currency/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency$format: currency$format,
            path__quovo$user$account$portfolio: path__quovo$user$account$portfolio,
            path__quovo$user$account$portfolio$history: path__quovo$user$account$portfolio$history,
            registerElement:  ["x-content"]
          })
        , logPrefix = "ctx-core/quovo/quovo-portfolio-navigation.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$portfolio(ctx);
      ctx.agent__quovo$portfolio.on("change", quovo$portfolio__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$portfolio.off("change", quovo$portfolio__on$change);
    }
    function quovo$portfolio__on$change() {
      log(`${logPrefix}|quovo$portfolio__on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-portfolio-navigation>