<quovo-sync-iframe class="{loading: !ctx.quovo__iframe$url}">
  <iframe src="{ctx.quovo__iframe$url}" if="{ctx.quovo__iframe$url}"></iframe>
  <script type="text/ecmascript-6">
    import {init} from 'ctx-core/quovo/quovo-sync-iframe'
    init(this)
  </script>
</quovo-sync-iframe>