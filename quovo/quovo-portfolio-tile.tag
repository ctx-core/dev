<quovo-portfolio-tile class="quovo-tile">
  <quovo-portfolio-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-portfolio-nav>
  <section>
    <quovo-positions show="{ctx.route$name__quovo__user__account$portfolio}" ctx="{opts.ctx}"></quovo-positions>
    <quovo-portfolio-history show="{ctx.route$name__quovo__user__account$portfolio$history}" ctx="{opts.ctx}"></quovo-portfolio-history>
  </section>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-portfolio-tile.tag";
    log(logPrefix);
  </script>
</quovo-portfolio-tile>