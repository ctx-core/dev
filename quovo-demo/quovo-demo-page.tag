<quovo-demo-page>
  <cen-demo-layout ctx="{opts.ctx}">
    <yield to="main">
      <quovo-users-tile ctx="{opts.ctx}"></quovo-users-tile>
    </yield>
  </cen-demo-layout>
  <style type="text/css">
    quovo-demo-page {
      display: -webkit-box;
      display: flex;
    }
  </style>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__router__quovo} from 'ctx-core/quovo-demo/route'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo-demo/quovo-demo-page.tag'
    log(logPrefix)
    mount__router__quovo(tag)
  </script>
</quovo-demo-page>