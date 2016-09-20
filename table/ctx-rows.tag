<ctx-rows>
  <ctx-rows-present show="{ctx && ctx.row$ctx$$__filter.length}">
    <ctx-row
      each="{row$ctx in ctx.row$ctx$$__filter}"
      class="{select: row$ctx.row_id === ctx.row_id}"
      onclick="{onclick__tag$row}"
      data-row-id="{row$ctx.row_id}"
    >{row$ctx.name}</ctx-row>
  </ctx-rows-present>
  <ctx-rows-blank show="{!(ctx && ctx.row$ctx$$__filter.length)}">
    Loading&hellip;
  </ctx-rows-blank>
  <style>
    ctx-rows ctx-rows-present ctx-row {
      display: block;
      padding: 2px;
      list-style-type: none;
      cursor: pointer;
    }
    ctx-rows ctx-rows-present ctx-row.select {
      background: #cccccc;
      font-weight: bold;
    }
    ctx-rows ctx-rows-blank {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign,new__update__ctx} from 'ctx-core/tag/lib'
    import {navigate} from 'ctx-core/route/lib'
    import {$array} from 'ctx-core/array/lib'
    import {mount__table} from 'ctx-core/table/tag'
    import {$dom$$} from 'ctx-core/dom/lib'
    import {add as add__class} from 'ctx-core/dom-classes/lib'
    import {fn$log,log,debug} from 'ctx-core/logger/lib'
    const update__ctx = new__update__ctx({after: assign__update$after})
        , tag = tag__assign(this, {
            update__ctx: update__ctx.bind(this),
            schedule__update__ctx: schedule__update__ctx.bind(this),
            onclick__tag$row,
            registerElement: [
              'ctx-rows-present',
              'ctx-row',
              'ctx-rows-blank']
          })
        , logPrefix = 'ctx-core/table/ctx-rows.tag'
    let ctx = tag.ctx
    log(logPrefix)
    mount__table(tag, {
      on$change__row_id: fn$log(
        `${logPrefix}|on$change__row_id`,
        tag.update__ctx),
      on$change__row$ctx$$__filter: fn$log(
        `${logPrefix}|on$change__row$ctx$$__filter`,
        tag.update__ctx)
    })
    function assign__update$after() {
      log(`${logPrefix}|assign__update$after`)
      let {row_id} = tag.ctx
      dom$row_data_row_id$$(row_id).forEach(
        dom$row_data_row_id =>
          add__class(dom$row_data_row_id, 'highlight'))
    }
    function onclick__tag$row(e) {
      log(`${logPrefix}|onclick__tag$row`)
      const {target} = e
          , row_id = parseInt(target.getAttribute('data-row-id'))
      navigate(ctx, `${ctx.route$path}?row_id=${encodeURIComponent(row_id)}`)
    }
    function dom$row_data_row_id$$(row_id) {
      return $array($dom$$(`ctx-row[data-row-id='${row_id}']`))
    }
  </script>
</ctx-rows>