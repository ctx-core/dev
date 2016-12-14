<ctx-dialog
  class="{className()}"
  onclick="{onclick__root}">
  <section>
    <yield from="section" />
    <yield />
  </section>
  <style type="text/css">
    ctx-dialog {
      position: absolute;
      display: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      transition: all 0.3s ease;
    }
    ctx-dialog.show {
      display: -webkit-box;
      display: block;
    }
    ctx-dialog > section {
      position: absolute;
      display: block;
      overflow-y: hidden;
      width: 100%;
      height: 100%;
    }
    ctx-dialog > section > * {
      overflow: hidden;
      position: absolute;
      width: 60%;
      left: 50%;
      height: auto;
      margin-left: -30%;
      opacity: 1.0;
      transition: all 0.3s ease;
    }
    ctx-dialog > section > :not(.show) {
      display: none;
    }
    ctx-dialog > section > * > section {
      display: block;
      overflow: hidden;
      background: #ffffff;
      border: 1px dotted #000000;
    }
    /* .dialog-center */
    ctx-dialog > section > .dialog-center > .topbar > .back-button {
      float: right;
    }
    ctx-dialog > section > .dialog-center > .topbar > .back-button::before {
      content: "\2715";
    }
    @media (max-width: 900px) {
      ctx-dialog > section {
        width: 100%;
        left: 0;
        margin: 0;
      }
    }
    /* .dialog-right */
    ctx-dialog > section > .dialog-right {
      width: 30%;
      height: 100%;
      left: auto;
      right: 0;
    }
    ctx-dialog > section > .dialog-right > .topbar > title {
      float: right;
      text-align: right;
    }
    ctx-dialog > section > .dialog-right > .topbar > .back-button {
      float: left;
    }
    ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
      content: "\02192";
    }
    ctx-dialog.hide__inProgress > section > .dialog-right > .topbar > .back-button::before {
      content: "\02190";
    }
    ctx-dialog > section > .dialog-right > section {
      height: calc(100% - 3rem);
    }
    @media (max-width: 900px) {
      ctx-dialog > section > .dialog-right > .topbar > title {
        float: none;
        text-align: center;
      }
      ctx-dialog > section > .dialog-right > .topbar > .back-button {
        float: right;
      }
      ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
        content: "\2715";
      }
      ctx-dialog.hide__inProgress > section > .dialog-right > .topbar > .back-button::before {
        content: "\2715";
      }
      ctx-dialog > section > .dialog-right > section {
        height: auto;
      }
    }
  </style>
  <script type="text/ecmascript-6">
    import {
      tag__assign,
      update__ctx as update__ctx__core} from 'ctx-core/tag/lib'
    import {mount__dialog} from 'ctx-core/dialog/tag'
    import {$dom
          , $$dom
          , has__class
          , add__class} from 'ctx-core/dom/lib'
    import {dialog__agent} from 'ctx-core/dialog/agent'
    import {log,info,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            className,
            update__ctx,
            onclick__root
          })
        , slideOut__delay = 30
        , logPrefix = 'ctx-core/dialog/ctx-dialog.tag'
    let {ctx} = tag
      , layer
    mount__dialog(tag, {
      on$change__dialogs__agent,
      on$change__dialog__agent
    })
    log(logPrefix)
    let root
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      root = tag.root
      layer = {
        dom$el: root
      }
      ctx.layers__agent.push({layers: [layer]})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.layers__agent.remove(layer)
    }
    function on$change__dialogs__agent() {
      log(`${logPrefix}|on$change__dialogs__agent`)
      tag.update__ctx()
    }
    function on$change__dialog__agent() {
      log(`${logPrefix}|on$change__dialog__agent`)
      root.className = tag.className()
    }
    function onclick__root(e) {
      log(`${logPrefix}|onclick__root`)
      const dom$clear$$ = [
              root,
              $dom('section', root),
              ...Array.from($$dom('ctx-dialog > section > *', root))]
          , in__dom$clear$$ =
              !!(dom$clear$$.find(
                dom =>
                  dom === e.target))
      if (in__dom$clear$$) {
        clear()
        return false
      }
      return true
    }
    function className() {
      log(`${logPrefix}|className`)
      let className$$ = []
      const {dialogs} = ctx
      if (dialogs && dialogs.length) className$$.push('show')
      const dialog = ctx.dialog
      if (dialog && dialog.tag$name) className$$.push(dialog.tag$name)
      return className$$.join(' ')
    }
    function clear() {
      log(`${logPrefix}|clear`)
      ctx.dialogs__agent.clear()
    }
    function update__ctx() {
      log(`${logPrefix}|update__ctx`)
      init__hide()
      return update__ctx__core.call(tag, ...arguments)
    }
    function init__hide() {
      log(`${logPrefix}|init__hide`)
      const hide = ctx.dialogs
              && !ctx.dialogs.length
              && has__class(root, 'show')
              && !has__class(root, 'hide__inProgress')
      if (hide) {
        add__class(
          root,
          'hide__inProgress')
        schedule__hide()
      }
    }
    function schedule__hide() {
      log(`${logPrefix}|schedule__init__hide`)
      setTimeout(hide, slideOut__delay)
    }
    function hide() {
      info(`${logPrefix}|hide`)
      root.className = ''
    }
  </script>
</ctx-dialog>