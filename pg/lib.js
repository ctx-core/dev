import {assign,clone} from 'ctx-core/object/lib'
import {assign__ctx__error,throw__error} from 'ctx-core/error/lib'
import pg from 'pg'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/pg/lib'
pg.defaults.ssl = true
export function connect__pg(ctx, fn) {
  log(`${logPrefix}|connect__pg`)
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|connect__pg|Promise`)
      connect__private__pg(
        ctx,
        {resolve, reject},
        fn)
    })
}
function connect__private__pg(ctx, ctx__promise, fn) {
  log(`${logPrefix}|connect__private__pg`)
  const {pg$url} = ctx
  return pg.connect(pg$url, (error__connect__pg, client__pg, done__connect__pg) => {
    log(`${logPrefix}|connect__private__pg|pg.connect`)
    assign(ctx__promise, {done__connect__pg})
    if (error__connect__pg) {
      error(`${logPrefix}|connect__private__pg|pg.connect|error`, error__connect__pg)
      reject__done(ctx, ctx__promise, error__connect__pg)
      return
    }
    log(`${logPrefix}|connect__private__pg|pg.connect|success`)
    assign(ctx, {client__pg})
    if (fn) {
      fn(ctx)
        .then(() => resolve__done(ctx, ctx__promise))
        .catch(ctx__error => reject__done(ctx, ctx__promise, ctx__error))
    } else {
      resolve__done(ctx, ctx__promise)
    }
  })
}
function resolve__done(ctx, ctx__promise) {
  log(`${logPrefix}|resolve__done`)
  ctx__promise.done__connect__pg()
  ctx__promise.resolve(ctx)
}
function reject__done(ctx, ctx__promise, ctx__error) {
  log(`${logPrefix}|reject__done`)
  assign__ctx__error(ctx, ctx__error)
  ctx__promise.done__connect__pg()
  ctx__promise.reject(ctx__error)
}
export function query__pg(ctx) {
  const ctx__clone = clone(...arguments)
      , {client__pg} = ctx__clone
      , sql$$ =
          ctx__clone.query__sql__pg$$
          || ctx__clone.sql__pg$$
          || ctx__clone.sql$$
          || ctx__clone.sql
          || []
  log(`${logPrefix}|query__pg`, sql$$[0].slice(0, 256))
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|query__pg|Promise`)
      assign(ctx__clone, {resolve, reject})
      let query__pg$$ = sql$$.concat(done__query__pg)
      client__pg.query(...query__pg$$)
    })
  function done__query__pg(ctx__error, query__pg$) {
    log(`${logPrefix}|query__pg|done__query__pg__fn`)
    const {resolve, reject} = ctx__clone
    if (ctx__error) {
      error(`${logPrefix}|query__pg|done__query__pg__fn|error`, ctx__error)
      reject(assign(ctx__clone, {error_message: ctx__error}))
    } else {
      log(`${logPrefix}|query__pg|done__query__pg__fn|success`)
      assign(ctx, {query__pg$})
      resolve(ctx)
    }
  }
}
export async function transaction__pg(ctx) {
  log(`${logPrefix}|transaction__pg`)
  const ctx__clone = clone(...arguments)
      , transaction$fn__pg =
          ctx__clone.transaction$fn__pg
          || ctx__clone.fn
  await begin__pg(...arguments)
  try {
    await transaction$fn__pg(...arguments)
    await commit__pg(...arguments)
  } catch (ctx__error) {
    await rollback__pg(...arguments)
    throw__error(ctx, ctx__error)
  }
}
export function begin__pg() {
  log(`${logPrefix}|begin__pg`)
  const ctx__clone = clone(...arguments)
      , {client__pg} = ctx__clone
      , sql__begin__pg =
          ctx__clone.sql__begin__pg$$
          || ctx__clone.sql__pg$$
          || ctx__clone.sql$$
          || 'BEGIN'
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|begin__pg|Promise`)
      client__pg.query(sql__begin__pg, error_message => {
        log(`${logPrefix}|begin__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|begin__pg|Promise|query|error`, error_message)
          reject(assign(ctx__clone, {error_message}))
        } else {
          log(`${logPrefix}|begin__pg|Promise|query|success`)
          resolve(ctx__clone)
        }
      })
    }
  )
}
export async function commit__pg() {
  log(`${logPrefix}|commit__pg`)
  const ctx__clone = clone(...arguments)
      , {client__pg} = ctx__clone
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|commit__pg|Promise`)
      client__pg.query('COMMIT', error_message => {
        log(`${logPrefix}|commit__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|commit__pg|Promise|query|error`, error_message)
          reject(assign(ctx__clone, {error_message}))
        } else {
          log(`${logPrefix}|commit__pg|Promise|query|success`)
          resolve(ctx__clone)
        }
      })
    }
  )
}
export async function rollback__pg() {
  log(`${logPrefix}|rollback__pg`)
  const ctx__clone = clone(...arguments)
      , {client__pg} = ctx__clone
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|rollback__pg|Promise`)
      client__pg.query('ROLLBACK', error_message => {
        log(`${logPrefix}|rollback__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|rollback__pg|Promise|query|error`, error_message)
          reject(assign(ctx__clone, {error_message}))
        } else {
          log(`${logPrefix}|rollback__pg|Promise|query|success`)
          resolve(ctx__clone)
        }
      })
    }
  )
}
