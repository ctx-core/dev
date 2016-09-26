import {assign, clone} from "ctx-core/object/lib";
import deepEqual from "deep-equal";
import {array$obj} from "ctx-core/array/lib";
import {$proxy__row} from "ctx-core/table/lib";
import {ensure__agent} from "ctx-core/agent/lib";
import {$offsets__column
      , $rows
      , $rows__data} from "ctx-core/table/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = 'ctx-core/table/agent'
export function table__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|table__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'table__agent',
    scope: [
      'table',
      'columns',
      'columns__data',
      'domain__table',
      'rows',
      'rank__table',
      'reverse__columns',
      'rows__data'
    ],
    init,
    $set$ctx
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|table__agent|init`)
    agent = this
  }
  function $set$ctx(set$ctx={}) {
    log(`${logPrefix}|table__agent|$set$ctx`)
    const {table} = set$ctx
    let columns =
          set$ctx.columns
          || (table && table[0])
      , columns__data =
          set$ctx.columns__data
          || columns
      , offsets__column =
          set$ctx.offsets__column
          || columns
             && $offsets__column(columns)
      , domain__table =
          set$ctx.domain__table
          || [0, 10.0]
      , domain__ticks =
          set$ctx.domain__ticks
          || [0, 5.0, 10.0]
      , rows =
          set$ctx.rows
          || table && $rows({
               rows: table.slice(1),
               offsets__column
             })
      , rows__data =
          set$ctx.rows__data
          || $rows__data({rows, columns__data, offsets__column})
      , reverse__columns = columns && columns.slice(0).reverse()
    assign(set$ctx, {
      table,
      domain__table,
      domain__ticks,
      rank__table: $rank__table(),
      offsets__column,
      columns,
      columns__data,
      rows,
      rows__data,
      reverse__columns
    })
    return set$ctx
    function $rank__table() {
      log(`${logPrefix}|table__agent|$set$ctx|$rank__table`)
      if (!table) return
      let rank__table = []
      rank__table.push(table[0])
      for (let i=1; i < table.length; i++) {
        rank__table.push(table[i].slice(0))
      }
      let rank__rows = rank__table.slice(1)
      for (let i=0; i < columns.length; i++) {
        const sorted__rows =
                rank__rows.slice(0).sort(
                  (a,b) =>
                    a[i] > b[i]
                    ? -1
                    : b[i] < a[i]
                      ? 1
                      : 0)
        let rank = 0
          , current_value
        for (let j=0; j < sorted__rows.length; j++) {
          const row = sorted__rows[j]
              , value = row[i]
          if (current_value !== value) {
            current_value = value
            rank++
            row[i] = rank
          }
        }
      }
      for (let i=1; i < rank__table.length; i++) {
        rank__table[i] = $proxy__row({
          row: rank__table[i],
          offsets__column
        })
      }
      return rank__table
    }
  }
}
export function row_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row_id__agent`)
  return ensure__agent(ctx, {
    key: 'row_id__agent',
    scope: ['row_id']
  }, ...agent$ctx$$)
}
export function filter__rows__data__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|filter__rows__data__agent`)
  let agent
  table__agent(ctx)
  return ensure__agent(ctx, {
    key: 'filter__rows__data__agent',
    scope: [
      'filter__rows__data',
      'inputs__filter__rows__data',
      'filter__rows__data$table'],
    $set$ctx,
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|filter__rows__data__agent|init`)
    agent = this
    ctx.table__agent.pick__on({on$change__table})
  }
  function $set$ctx() {
    log(`${logPrefix}|filter__rows__data__agent|$set$ctx`)
    const set$ctx = clone(...arguments)
        , {rows} = ctx
        , inputs__filter__rows__data =
            set$ctx.inputs__filter__rows__data
            || ctx.inputs__filter__rows__data
        , filter__rows__data =
            set$ctx.filter__rows__data
            || (inputs__filter__rows__data
                && inputs__filter__rows__data.filter(ctx.rows__data))
    if (!filter__rows__data) {
      return {
        filter__rows__data,
        inputs__filter__rows__data,
        filter__rows__data$table: null
      }
    }
    // Guard against duplicate work
    if (
      filter__rows__data.rows === rows
      && deepEqual(
        filter__rows__data.inputs__filter__rows__data,
        inputs__filter__rows__data)
    ) {
      return {}
    }
    log(`${logPrefix}|filter__rows__data__agent|$set$ctx|do`)
    // Guard against duplicate work
    assign(filter__rows__data, {
      rows,
      inputs__filter__rows__data
    })
    assign(set$ctx, {
      filter__rows__data,
      inputs__filter__rows__data,
      filter__rows__data$table: array$obj(filter__rows__data, 'row_id')
    })
    return set$ctx
  }
  function on$change__table() {
    log(`${logPrefix}|filter__rows__data__agent|on$change__table`)
    agent.reset__co()
  }
}
export function highlight__rows__data__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|highlight__rows__data__agent`)
  let agent
  row_id__agent(ctx)
  table__agent(ctx)
  filter__rows__data__agent(ctx)
  return ensure__agent(ctx, {
    key: 'highlight__rows__data__agent',
    scope: [
      'highlight__rows__data',
      'highlight__rows__data$table'
    ],
    init
  }, ...agent$ctx$$)
  return ctx
  function init() {
    log(`${logPrefix}|highlight__rows__data__agent|init`)
    agent = this
    ctx.row_id__agent.pick__on({on$change__row_id})
    ctx.table__agent.pick__on({on$change__table})
    ctx.filter__rows__data__agent.pick__on({on$change__filter__rows__data})
    assign__highlight__rows__data()
  }
  function on$change__row_id() {
    log(`${logPrefix}|highlight__rows__data__agent|on$change__row_id`)
    assign__highlight__rows__data()
  }
  function on$change__table() {
    log(`${logPrefix}|highlight__rows__data__agent|on$change__table`)
    assign__highlight__rows__data()
  }
  function on$change__filter__rows__data() {
    log(`${logPrefix}|highlight__rows__data__agent|on$change__filter__rows__data`)
    assign__highlight__rows__data()
  }
  function assign__highlight__rows__data() {
    log(`${logPrefix}|highlight__rows__data__agent|assign__highlight__rows__data`)
    const { row_id
          , rows__data
          , filter__rows__data} = ctx
        , rows__data$ = filter__rows__data || rows__data
    let highlight__rows__data
    if (rows__data$) {
      highlight__rows__data = []
      for (let i=0; i < rows__data$.length; i++) {
        const row = rows__data$[i]
        if (row.row_id === row_id) {
          highlight__rows__data.push(row)
        }
      }
    }
    const highlight__rows__data$table =
            highlight__rows__data
            && array$obj(highlight__rows__data, 'row_id')
    agent.set({
      highlight__rows__data,
      highlight__rows__data$table
    })
  }
}
export function row__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row__agent`)
  let agent
  row_id__agent(ctx)
  table__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row__agent',
    scope: ['row'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|row__agent|init`)
    agent = this
    ctx.row_id__agent.pick__on({on$change__row_id})
    ctx.table__agent.pick__on({on$change__table})
    set__row()
  }
  function on$change__row_id() {
    log(`${logPrefix}|row__agent|on$change__row_id`, ctx.row_id)
    set__row()
  }
  function on$change__table() {
    log(`${logPrefix}|row__agent|on$change__table`)
    set__row()
  }
  function set__row() {
    log(`${logPrefix}|row__agent|set__row`)
    const {rows,row_id} = ctx
    if (!rows || !row_id) return
    let row
    for (let i=0; i < rows.length; i++) {
      const row$ = rows[i]
      if (row$.row_id === row_id) {
        row = row$
        break
      }
    }
    agent.set({row})
  }
}