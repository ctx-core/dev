<quovo-portfolio-tile class="quovo-tile">
  <quovo-portfolio-navigation class="quovo-navigation" ctx="{opts.ctx}"></quovo-portfolio-navigation>
  <content>
    <quovo-positions show="{ctx.route$name__quovo$user$account$portfolio}" ctx="{opts.ctx}"></quovo-positions>
    <quovo-portfolio-history show="{ctx.route$name__quovo$user$account$portfolio$history}" ctx="{opts.ctx}"></quovo-portfolio-history>
  </content>
  <style>
  </style>
</quovo-portfolio-tile>