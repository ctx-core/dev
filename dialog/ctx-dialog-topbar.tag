<ctx-dialog-topbar class="topbar">
  <a class="back-button" href="#" onclick="{onclick__back_button}"></a>
  <title show="{ctx.dialog.title}">&nbsp;{ctx.dialog.title}&nbsp;</title>
  <style type="text/css">
    ctx-dialog-topbar {
      display: block;
      height: 3rem;
      width: 100%;
      overflow: hidden;
      min-height: 1.25em;
      line-height: 1.25em;
      background: #222222;
      border-bottom: 1px dotted #000000;
      padding: 10px 0;
    }
    ctx-dialog-topbar > .back-button {
      display: block;
      float: right;
      width: 2em;
      padding: 0.25em 0;
      font-size: 18px;
      cursor: pointer;
    }
    ctx-dialog-topbar > .back-button::before {
      content: '';
      display: block;
      width: 2em;
      height: 1.3em;
      text-align: center;
    }
    ctx-dialog-topbar > title {
      display: block;
      padding: 0.25em 0;
      font-size: 18px;
      font-weight: bold;
    }
    @media (max-width: 900px) {
      ctx-dialog-topbar {
        height: 3.2rem;
      }
      ctx-dialog-topbar > ctx-back-button {
        position: absolute;
        right: 0;
        float: none;
      }
      ctx-dialog-topbar > title {
        width: 100%;
        text-align: center;
      }
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {dialogs__agent} from 'ctx-core/dialog/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            onclick__back_button: onclick__back_button,
            registerElement: ['ctx-back-button']
          })
        , logPrefix = 'dialog/ctx-dialog-topbar.tag'
    log(logPrefix)
    let ctx = tag.ctx
    dialogs__agent(ctx)
    function onclick__back_button() {
      log(`${logPrefix}|onclick__back_button`)
      clear()
    }
    function clear() {
      log(`${logPrefix}|clear`)
      ctx.dialogs__agent.remove({
        dialogs: [tag.opts.dialog]
      })
    }
  </script>
</ctx-dialog-topbar>