<ctx-row-cells class="{
  present: !!(ctx && ctx.row$ctx),
  compact: !!(ctx && ctx.tag$row_details$compact)}">
  <ctx-cells-present show="{ctx && ctx.row$ctx}">
    <ul>
      <li>
        Column
      </li>
      <li>
        <span show="{ctx && ctx.tag$row_details$compact}">Rank ({ctx && ctx.row$ctx$$.length})</span>
        <span show="{ctx && !ctx.tag$row_details$compact}">Rank (out of {ctx && ctx.row$ctx$$.length})</span>
      </li>
      <li>
        <span show="{ctx && ctx.tag$row_details$compact}">Rating</span>
        <span show="{ctx && !ctx.tag$row_details$compact}">MSCI Rating</span>
      </li>
    </ul>
    <ctx-cell
      each="{ctx_cell in ctx.row$ctx.cell$ctx$$}">
      <ctx-column>{ctx_cell.column$display}</ctx-column>
      <ctx-cell-rank>{ctx_cell.cell$rank}</ctx-cell-rank>
      <ctx-cell-value>{ctx_cell.cell$value}</ctx-cell-value>
    </ctx-cell>
  </ctx-cells-present>
  <ctx-cells-blank show="{!(ctx && ctx.row$ctx)}">
    Select a company&hellip;
  </ctx-cells-blank>
  <style>
    ctx-row-cells {
      border: 1px dotted #111111;
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
    import {row$ctx__agent} from 'ctx-core/table/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            registerElement: [
              'ctx-cells-present',
              'ctx-cell',
              'ctx-column',
              'ctx-cell-rank',
              'ctx-cell-value',
              'ctx-cells-blank'
            ]
          })
        , logPrefix = 'ctx-core/table/ctx-row-cells.tag'
    log(logPrefix)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      let ctx = tag.ctx
      row$ctx__agent(ctx)
      ctx.row$ctx__agent.pick__on({on$change__row$ctx})
      on$change__row$ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      let ctx = tag.ctx
      ctx.row$ctx__agent.pick__off({on$change__row$ctx})
    }
    function on$change__row$ctx() {
      log(`${logPrefix}|on$change__row$ctx`)
      tag.update__ctx()
    }
  </script>
</ctx-row-cells>