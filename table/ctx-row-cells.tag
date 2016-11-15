<ctx-row-cells class="{
  present: !!(ctx && ctx.row),
  compact: !!(ctx && ctx.tag$row_details$compact)}">
  <ctx-cells-present show="{ctx && ctx.row}">
    <ul>
      <li>
        Column
      </li>
      <li>
        <span show="{ctx && ctx.tag$row_details$compact}">Rank ({ctx && ctx.rows.length})</span>
        <span show="{ctx && !ctx.tag$row_details$compact}">Rank (out of {ctx && ctx.rows.length})</span>
      </li>
      <li>
        <span show="{ctx && ctx.tag$row_details$compact}">Rating</span>
        <span show="{ctx && !ctx.tag$row_details$compact}">MSCI Rating</span>
      </li>
    </ul>
    <ctx-cell
      each="{column, i in ctx.columns__data}"
    >
      <ctx-column>{present__column(column)}</ctx-column>
      <ctx-cell-rank>{ctx.rank__table[ctx.row.i + 1][column]}</ctx-cell-rank>
      <ctx-cell-value>{ctx.row[column]}</ctx-cell-value>
    </ctx-cell>
  </ctx-cells-present>
  <ctx-cells-blank show="{!(ctx && ctx.row)}">
    Select a company&hellip;
  </ctx-cells-blank>
  <style type="text/css">
    ctx-row-cells {
      border: 1px dotted #000000;
    }
    ctx-row-cells ctx-cells-present {
      display: table;
    }
    ctx-row-cells ctx-cells-present > * {
      display: table-row;
    }
    ctx-row-cells ctx-cells-present > * > * {
      display: table-cell;
      padding: 2px 20px;
    }
    ctx-row-cells.compact ctx-cells-present > * > * {
      padding: 2px 10px;
    }
    ctx-row-cells ctx-cells-present ul {
      list-style: none;
    }
    ctx-row-cells ctx-cells-present ul li {
      text-decoration: underline;
    }
    ctx-row-cells ctx-cells-blank {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {row__agent} from 'ctx-core/table/agent'
    import {present__column} from 'ctx-core/table/lib'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            registerElement: [
              'ctx-cells-present',
              'ctx-cell',
              'ctx-column',
              'ctx-cell-rank',
              'ctx-cell-value',
              'ctx-cells-blank'
            ],
            present__column})
        , logPrefix = 'ctx-core/table/ctx-row-cells.tag'
    log(logPrefix)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      let ctx = tag.ctx
      row__agent(ctx)
      ctx.row__agent.pick__on({on$change__row})
      on$change__row()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      let ctx = tag.ctx
      ctx.row__agent.pick__off({on$change__row})
    }
    function on$change__row() {
      log(`${logPrefix}|on$change__row`)
      tag.update__ctx()
    }
  </script>
</ctx-row-cells>