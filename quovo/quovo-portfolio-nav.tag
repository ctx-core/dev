<quovo-portfolio-nav class="quovo-nav">
  <title>Portfolio</title>
  <div>
    <a
      href="{path__quovo__user__account$portfolio(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo__user__account$portfolio}"
      onclick="{onclick__navigate}">Positions</a>
    <a
      href="{path__quovo__user__account$portfolio$history(ctx)}"
      class="selected-maybe {selected: ctx.route$name__quovo__user__account$portfolio$history}"
      onclick="{onclick__navigate}"
    >Transaction History</a>
  </div>
  <style>
    quovo-portfolio-nav > div > * {
      display: block;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-portfolio-nav > div > a {
      padding: 10px;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {quovo__portfolio__agent} from "ctx-core/quovo/agent";
    import {
      path__quovo__user__account$portfolio,
      path__quovo__user__account$portfolio$history} from "ctx-core/quovo/path";
    import {mount__currency} from "ctx-core/currency/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            path__quovo__user__account$portfolio: path__quovo__user__account$portfolio,
            path__quovo__user__account$portfolio$history: path__quovo__user__account$portfolio$history
          })
        , logPrefix = "ctx-core/quovo/quovo-portfolio-nav.tag";
    mount__currency(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      quovo__portfolio__agent(ctx);
      ctx.quovo__portfolio__agent.on("change", on$change__quovo__portfolio);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo__portfolio__agent.off("change", on$change__quovo__portfolio);
    }
    function on$change__quovo__portfolio() {
      log(`${logPrefix}|on$change__quovo__portfolio`);
      tag.update__ctx();
    }
  </script>
</quovo-portfolio-nav>