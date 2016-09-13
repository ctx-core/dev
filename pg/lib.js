import {assign,clone} from 'ctx-core/object/lib'
import {assign__error$ctx,throw__error} from 'ctx-core/error/lib'
import pg from 'pg'
import co from 'co'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/pg/lib'
pg.defaults.ssl = true
export function *connect__pg(ctx, pg__connect__fn) {
  log(`${logPrefix}|connect__pg`)
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|connect__pg|Promise`)
      connect__private__pg(
        ctx,
        {resolve, reject},
        pg__connect__fn)
    })
}
function connect__private__pg(ctx, promise$ctx, pg__connect__fn) {
  log(`${logPrefix}|connect__private__pg`)
  const {pg$url} = ctx
  return pg.connect(pg$url, (pg__connect$error, pg$client, pg__connect__done) => {
    log(`${logPrefix}|connect__private__pg|pg.connect`)
    assign(promise$ctx, {pg__connect__done})
    if (pg__connect$error) {
      error(`${logPrefix}|connect__private__pg|pg.connect|error`, pg__connect$error)
      done$reject(ctx, promise$ctx, pg__connect$error)
    } else {
      log(`${logPrefix}|connect__private__pg|pg.connect|success`)
      assign(ctx, {pg$client})
      if (pg__connect__fn) {
        co(function *() {
          log(`${logPrefix}|connect__private__pg|pg.connect|success|co`)
          return yield pg__connect__fn()
        })
          .then(() => done$resolve(ctx, promise$ctx))
          .catch(error$ctx => {
            done$reject(ctx, promise$ctx, error$ctx)
          })
      } else {
        done$resolve(ctx, promise$ctx)
      }
    }
  })
}
function done$resolve(ctx, promise$ctx) {
  log(`${logPrefix}|done$resolve`)
  promise$ctx.pg__connect__done()
  promise$ctx.resolve(ctx)
}
function done$reject(ctx, promise$ctx, error$ctx) {
  log(`${logPrefix}|done$reject`)
  assign__error$ctx(ctx, error$ctx)
  promise$ctx.pg__connect__done()
  promise$ctx.reject(error$ctx)
}
export function *query__pg(ctx, ...ctx$clone$rest$$) {
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , {pg$client} = ctx$clone
      , sql$$ =
          ctx$clone.query__pg$sql$$
          || ctx$clone.pg$sql$$
          || ctx$clone.sql$$
          || ctx$clone.sql
          || []
  log(`${logPrefix}|query__pg`, sql$$[0].slice(0, 256))
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|query__pg|Promise`)
      assign(ctx$clone, {resolve, reject})
      let query__pg$$ = sql$$.concat(query__pg$done)
      pg$client.query(...query__pg$$)
    })
  function query__pg$done(error$ctx, query__pg$) {
    log(`${logPrefix}|query__pg|query__pg$done__fn`)
    const {resolve, reject} = ctx$clone
    if (error$ctx) {
      error(`${logPrefix}|query__pg|query__pg$done__fn|error`, error$ctx)
      reject(assign(ctx$clone, {error_message: error$ctx}))
    } else {
      log(`${logPrefix}|query__pg|query__pg$done__fn|success`)
      assign(ctx, {query__pg$})
      resolve(ctx)
    }
  }
}
export function *transaction__pg(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|transaction__pg`)
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , transaction$fn__pg =
          ctx$clone.transaction$fn__pg
          || ctx$clone.fn
  yield begin__pg(ctx, ...ctx$clone$rest$$)
  try {
    yield transaction$fn__pg(ctx, ...ctx$clone$rest$$)
    yield commit__pg(ctx, ...ctx$clone$rest$$)
  } catch (error$ctx) {
    yield rollback__pg(ctx, ...ctx$clone$rest$$)
    throw__error(ctx, error$ctx)
  }
}
export function *begin__pg(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|begin__pg`)
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , {pg$client} = ctx$clone
      , pg__begin$sql =
          ctx$clone.pg__begin$sql$$
          || ctx$clone.pg$sql$$
          || ctx$clone.sql$$
          || 'BEGIN'
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|begin__pg|Promise`)
      pg$client.query(pg__begin$sql, error_message => {
        log(`${logPrefix}|begin__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|begin__pg|Promise|query|error`, error_message)
          reject(assign(ctx$clone, {error_message}))
        } else {
          log(`${logPrefix}|begin__pg|Promise|query|success`)
          resolve(ctx$clone)
        }
      })
    }
  )
}
export function *commit__pg(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|commit__pg`)
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , {pg$client} = ctx$clone
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|commit__pg|Promise`)
      pg$client.query('COMMIT', error_message => {
        log(`${logPrefix}|commit__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|commit__pg|Promise|query|error`, error_message)
          reject(assign(ctx$clone, {error_message}))
        } else {
          log(`${logPrefix}|commit__pg|Promise|query|success`)
          resolve(ctx$clone)
        }
      })
    }
  )
}
export function *rollback__pg(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|rollback__pg`)
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , {pg$client} = ctx$clone
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|rollback__pg|Promise`)
      pg$client.query('ROLLBACK', error_message => {
        log(`${logPrefix}|rollback__pg|Promise|query`)
        if (error_message) {
          error(`${logPrefix}|rollback__pg|Promise|query|error`, error_message)
          reject(assign(ctx$clone, {error_message}))
        } else {
          log(`${logPrefix}|rollback__pg|Promise|query|success`)
          resolve(ctx$clone)
        }
      })
    }
  )
}
