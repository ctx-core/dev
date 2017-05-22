<quovo-demo-page>
  <main>
    <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
  </main>
  <style type="text/css">
    quovo-demo-page {
      display: -webkit-box;
      display: flex;
    }
  </style>
  <script type="buble">
    import {init} from 'ctx-core/quovo-demo/quovo-demo-page'
    init(this)
  </script>
</quovo-demo-page>