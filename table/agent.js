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
export function table__agent(ctx, ...ctx__agent$$) {
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
      'rows__data',
      'rows__sorted'
    ],
    init,
    $ctx__set
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|table__agent|init`)
    agent = this
  }
  function $ctx__set(ctx__set={}) {
    log(`${logPrefix}|table__agent|$ctx__set`)
    const {table} = ctx__set
    let columns =
          ctx__set.columns
          || (table && table[0])
      , columns__data =
          ctx__set.columns__data
          || columns
      , offsets__column =
          ctx__set.offsets__column
          || columns
             && $offsets__column(columns)
      , domain__table =
          ctx__set.domain__table
          || [0, 10.0]
      , domain__ticks =
          ctx__set.domain__ticks
          || [0, 5.0, 10.0]
      , rows =
          ctx__set.rows
          || table && $rows({
               rows: table.slice(1),
               offsets__column
             })
      , rows__data =
          ctx__set.rows__data
          || $rows__data({rows, columns__data, offsets__column})
      , reverse__columns = columns && columns.slice(0).reverse()
    assign(ctx__set, {
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
    return ctx__set
    function $rank__table() {
      log(`${logPrefix}|table__agent|$ctx__set|$rank__table`)
      if (!table) return
      let rank__table = []
      rank__table.push(table[0])
      for (let i=1; i < table.length; i++) {
        rank__table.push(table[i].slice(0))
      }
      let rows__rank = rank__table.slice(1)
      for (let i=0; i < columns.length; i++) {
        const rows__sorted =
                rows__rank.slice(0).sort(
                  (a,b) =>
                    a[i] > b[i]
                    ? -1
                    : a[i] < b[i]
                      ? 1
                      : 0)
        let rank = 0
          , current_value
        for (let j=0; j < rows__sorted.length; j++) {
          const row = rows__sorted[j]
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
export function row_id__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|row_id__agent`)
  return ensure__agent(ctx, {
    key: 'row_id__agent',
    scope: ['row_id']
  }, ...ctx__agent$$)
}
export function filter__rows__data__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|filter__rows__data__agent`)
  let agent
  table__agent(ctx)
  return ensure__agent(ctx, {
    key: 'filter__rows__data__agent',
    scope: [
      'filter__rows__data',
      'inputs__filter__rows__data',
      'table__filter__rows__data'],
    $ctx__set,
    init
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|filter__rows__data__agent|init`)
    agent = this
    ctx.table__agent.on('change', on$change__table)
  }
  function $ctx__set() {
    log(`${logPrefix}|filter__rows__data__agent|$ctx__set`)
    const ctx__set = clone(...arguments)
        , {rows} = ctx
        , inputs__filter__rows__data =
            ctx__set.inputs__filter__rows__data
            || ctx.inputs__filter__rows__data
        , filter__rows__data =
            ctx__set.filter__rows__data
            || (inputs__filter__rows__data
                && inputs__filter__rows__data.filter(ctx.rows__data))
    if (!filter__rows__data) {
      return {
        filter__rows__data,
        inputs__filter__rows__data,
        table__filter__rows__data: null
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
    log(`${logPrefix}|filter__rows__data__agent|$ctx__set|do`)
    // Guard against duplicate work
    assign(filter__rows__data, {
      rows,
      inputs__filter__rows__data
    })
    assign(ctx__set, {
      filter__rows__data,
      inputs__filter__rows__data,
      table__filter__rows__data: array$obj(filter__rows__data, 'row_id')
    })
    return ctx__set
  }
  function on$change__table() {
    log(`${logPrefix}|filter__rows__data__agent|on$change__table`)
    agent.reset()
  }
}
export function highlight__rows__data__agent(ctx, ...ctx__agent$$) {
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
  }, ...ctx__agent$$)
  return ctx
  function init() {
    log(`${logPrefix}|highlight__rows__data__agent|init`)
    agent = this
    ctx.row_id__agent.on('change', on$change__row_id)
    ctx.table__agent.on('change', on$change__table)
    ctx.filter__rows__data__agent.on('change', on$change__filter__rows__data)
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
export function row__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|row__agent`)
  let agent
  row_id__agent(ctx)
  table__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row__agent',
    scope: ['row'],
    init
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|row__agent|init`)
    agent = this
    ctx.row_id__agent.on('change', on$change__row_id)
    ctx.table__agent.on('change', on$change__table)
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