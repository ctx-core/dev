<ctx-rows>
  <ctx-rows-present show="{length__rows()}">
    <ctx-row
      each="{row in rows()}"
      class="{select: row.row_id === ctx.row_id}"
      onclick="{onclick__tag$row}"
      data-row-id="{row.row_id}"
    >{titleCase($chain(row, 'ISSUER_NAME') || '')}</ctx-row>
  </ctx-rows-present>
  <ctx-rows-blank show="{!length__rows()}">
    Loading&hellip;
  </ctx-rows-blank>
  <style type="text/css">
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
  <script type="text/ecmascript-6">
    import {tag__assign
          , $update__ctx
          , schedule__update__ctx} from 'ctx-core/tag/lib'
    import {navigate} from 'ctx-core/route/lib'
    import {$array} from 'ctx-core/array/lib'
    import {titleCase} from 'ctx-core/string/lib'
    import {mount__table} from 'ctx-core/table/tag'
    import {$$dom} from 'ctx-core/dom/lib'
    import {add__class} from 'ctx-core/dom-classes/lib'
    import {fn$log,log,debug} from 'ctx-core/logger/lib'
    const update__ctx = $update__ctx({after: assign__update$after})
        , tag = tag__assign(this, {
            rows,
            length__rows,
            titleCase,
            update__ctx: update__ctx.bind(this),
            schedule__update__ctx: schedule__update__ctx.bind(this),
            onclick__tag$row,
            registerElement: [
              'ctx-rows-present',
              'ctx-row',
              'ctx-rows-blank']
          })
        , logPrefix = 'ctx-core/table/ctx-rows.tag'
    let {ctx} = tag
    log(logPrefix)
    mount__table(tag, {
      on$change__row_id: fn$log(
        `${logPrefix}|on$change__row_id`,
        tag.update__ctx),
      on$change__filter__rows__data: fn$log(
        `${logPrefix}|on$change__filter__rows__data`,
        tag.update__ctx)
    })
    function rows() {
      log(`${logPrefix}|rows`)
      return ctx.filter__rows__data || ctx.rows
    }
    function length__rows() {
      const rows$ = rows()
      return rows$ && rows$.length
    }
    function assign__update$after() {
      log(`${logPrefix}|assign__update$after`)
      let {row_id} = ctx
      const $$ = $$dom__data_row_id(row_id)
      for (let i=0; i < $$.length; i++) {
        let $ = $$[i]
        add__class($, 'highlight')
      }
    }
    function onclick__tag$row(e) {
      log(`${logPrefix}|onclick__tag$row`)
      const {target} = e
          , row_id = parseInt(target.getAttribute('data-row-id'))
          , {route$path} = ctx
      navigate(ctx, `${ctx.route$path}?row_id=${encodeURIComponent(row_id)}`)
    }
    function $$dom__data_row_id(row_id) {
      return $array($$dom(`ctx-row[data-row-id='${row_id}']`))
    }
  </script>
</ctx-rows>