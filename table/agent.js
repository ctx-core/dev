import {assign,clone,keys} from 'ctx-core/object/lib'
import {name$sort__array} from 'ctx-core/array/lib'
import deepEqual from 'deep-equal'
import {array$obj} from 'ctx-core/array/lib'
import {titleCase__string} from 'ctx-core/string/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {
  new__row$ctx,
  each__decorate__row$ctx$$} from  'ctx-core/table/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/agent'
export function table__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|table__agent`)
  return ensure__agent(ctx, {
    key: 'table__agent',
    scope: ['table']
  }, ...agent$ctx$$)
}
export function row$ctx$$__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row$ctx$$__agent`)
  let agent
  table__agent(ctx)
  columns__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row$ctx$$__agent',
    scope: ['row$ctx$$', 'sort__name__row$ctx$$'],
    init,
    new__set$ctx
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|row$ctx$$__agent|init`)
    agent = this
    ctx.table__agent.on('change', refresh)
    refresh()
  }
  function new__set$ctx() {
    let set$ctx = clone(...arguments)
    log(`${logPrefix}|row$ctx$$__agent|new__set$ctx`, set$ctx)
    const {row$ctx$$} = set$ctx
    assign(set$ctx, {
      sort__name__row$ctx$$: row$ctx$$ && name$sort__array(row$ctx$$)
    })
    return set$ctx
  }
  function refresh() {
    log(`${logPrefix}|row$ctx$$__agent|refresh`)
    const ctx$clone = clone(...arguments)
        , new__row$ctx$ = ctx$clone.new__row$ctx || new__row$ctx
        , {table} = ctx
        , row$ctx$$ = table && table.map(
            (row$source, row_index) =>
              new__row$ctx$(ctx, {row$source, row_index}))
    each__decorate__row$ctx$$(ctx, {
      row$ctx$$
    })
    agent.set({row$ctx$$})
    return ctx
  }
}
export function columns__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|columns__agent`)
  let agent
  table__agent(ctx)
  return ensure__agent(ctx, {
    key: 'columns__agent',
    scope: [
      'columns',
      'column$ctx$$',
      'column__ctx_column__map',
      'reverse__columns',
      'length__columns'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|columns__agent|init`)
    agent = this
    ctx.table__agent.on('change', refresh)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|columns__agent|refresh`)
    const {table} = ctx
        , table0 = table && table[0]
        , row$keys = table0 && keys(table0)
        , {columns$exclude=[]} = ctx
    let columns = row$keys && filter__row$keys(row$keys, columns$exclude)
      , column$ctx$$ = columns && map__columns(columns)
      , column__ctx_column__map = column$ctx$$ && array$obj(column$ctx$$, 'column')
      , reverse__columns = columns && columns.slice(0).reverse()
      , length__columns = columns && columns.length
    return agent.set({
      columns,
      column$ctx$$,
      column__ctx_column__map,
      reverse__columns,
      length__columns
    })
    return ctx
  }
  function filter__row$keys(row$keys, columns$exclude) {
    return row$keys
      .filter(
        row$key =>
          (columns$exclude.indexOf(row$key) == -1))
  }
  function map__columns(columns) {
    return columns.map(
      column => {
        return {
          column,
          column$display:
            titleCase__string(
              column
              .replace('_SCORE', '')
              .replace(/_/g, ' '))
        } })
  }
}
export function row_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row_id__agent`)
  return ensure__agent(ctx, {
    key: 'row_id__agent',
    scope: ['row_id']
  }, ...agent$ctx$$)
}
export function row$ctx$$__filter__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row$ctx$$__filter__agent`)
  let agent
  row$ctx$$__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row$ctx$$__filter__agent',
    scope: ['row$ctx$$__filter', 'table__row$ctx$$__filter'],
    new__set$ctx,
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|row$ctx$$__filter__agent|init`)
    agent = this
    ctx.row$ctx$$__agent.pick__on({on$change__row$ctx$$})
  }
  function new__set$ctx() {
    log(`${logPrefix}|row$ctx$$__filter__agent|new__set$ctx`)
    const set$ctx = clone(...arguments)
        , {row$ctx$$} = ctx
        , inputs__filter__row$ctx$$ =
            set$ctx.inputs__filter__row$ctx$$
            || ctx.inputs__filter__row$ctx$$
        , row$ctx$$__filter$ = ctx.row$ctx$$__filter
    // Guard against duplicate work
    if (
      row$ctx$$__filter$
      && row$ctx$$__filter$.row$ctx$$ === row$ctx$$
      && deepEqual(
        row$ctx$$__filter$.inputs__filter__row$ctx$$,
        inputs__filter__row$ctx$$)) {
      return {}
    }
    log(`${logPrefix}|row$ctx$$__filter__agent|new__set$ctx|do`)
    const row$ctx$$__filter = set$ctx.row$ctx$$__filter
          || (inputs__filter__row$ctx$$ && inputs__filter__row$ctx$$.filter())
          || []
    // Guard against duplicate work
    assign(row$ctx$$__filter, {
      row$ctx$$,
      inputs__filter__row$ctx$$
    })
    assign(set$ctx, {
      row$ctx$$__filter,
      inputs__filter__row$ctx$$,
      table__row$ctx$$__filter: array$obj(row$ctx$$__filter, 'row_id')
    })
    return set$ctx
  }
  function on$change__row$ctx$$() {
    log(`${logPrefix}|row$ctx$$__filter__agent|on$change__row$ctx$$`)
    agent.reset__co()
  }
}
export function row$ctx$$__filter__highlight__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row$ctx$$__filter__highlight__agent`)
  let agent
  row_id__agent(ctx)
  row$ctx$$__filter__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row$ctx$$__filter__highlight__agent',
    scope: ['row$ctx$$__filter__highlight'],
    init
  }, ...agent$ctx$$)
  return ctx
  function init() {
    log(`${logPrefix}|row$ctx$$__filter__highlight__agent|init`)
    agent = this
    ctx.row_id__agent.pick__on({on$change__row_id})
    ctx.row$ctx$$__filter__agent.pick__on({on$change__row$ctx$$__filter})
    assign__row$ctx$$__filter__highlight$()
  }
  function on$change__row_id() {
    log(`${logPrefix}|row$ctx$$__filter__highlight__agent|on$change__row_id`)
    assign__row$ctx$$__filter__highlight$()
  }
  function on$change__row$ctx$$__filter() {
    log(`${logPrefix}|row$ctx$$__filter__highlight__agent|on$change__row$ctx$$__filter`)
    assign__row$ctx$$__filter__highlight$()
  }
  function assign__row$ctx$$__filter__highlight$() {
    log(`${logPrefix}|row$ctx$$__filter__highlight__agent|assign__row$ctx$$__filter__highlight$`)
    const {row_id,row$ctx$$__filter} = ctx
    agent.set({
      row$ctx$$__filter__highlight: (row$ctx$$__filter && row$ctx$$__filter.find(
        row$ctx =>
          row$ctx.row_id == row_id))})
  }
}
export function row$ctx__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row$ctx__agent`)
  let agent
  row_id__agent(ctx)
  row$ctx$$__agent(ctx)
  return ensure__agent(ctx, {
    key: 'row$ctx__agent',
    scope: ['row$ctx'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|row$ctx__agent|init`)
    agent = this
    ctx.row_id__agent.pick__on({on$change__row_id})
    ctx.row$ctx$$__agent.pick__on({on$change__row$ctx$$})
    set__row$ctx()
  }
  function on$change__row_id() {
    log(`${logPrefix}|row$ctx__agent|on$change__row_id`, ctx.row_id)
    set__row$ctx()
  }
  function on$change__row$ctx$$() {
    log(`${logPrefix}|row$ctx__agent|on$change__row$ctx$$`)
    set__row$ctx()
  }
  function set__row$ctx() {
    log(`${logPrefix}|row$ctx__agent|assign__row$ctx$`)
    const {row$ctx$$,row_id} = ctx
        , row$ctx = row$ctx$$ && row$ctx$$[row_id]
    agent.set({
      row$ctx
    })
  }
}