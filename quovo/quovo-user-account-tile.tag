<quovo-user-account-tile class="quovo-tile">
  <quovo-user-account-navigation ctx="{opts.ctx}"></quovo-user-account-navigation>
  <x-content>
    <quovo-user-account-details show="{ctx.route$name__quovo$user$account}" ctx="{opts.ctx}"></quovo-user-account-details>
    <quovo-portfolio-tile show="{ctx.route__quovo$portfolio$tile}" ctx="{opts.ctx}"></quovo-portfolio-tile>
  </x-content>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    const tag = fn$tag(this, {
            registerElement: ["x-content"]
          });
  </script>
</quovo-user-account-tile>