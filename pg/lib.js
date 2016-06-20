import {assign,clone} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import {assign__error,error$throw} from "ctx-core/error/lib";
import pg from "pg";
import co from "co";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/pg/lib";
pg.defaults.ssl = true;
export function *pg$connect(ctx, pg$connect$fn) {
  log(`${logPrefix}|pg$connect`);
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg$connect|Promise`);
      pg$connect$1(ctx, {resolve: resolve, reject: reject}, pg$connect$fn)
    });
}
function pg$connect$1(ctx, promise$ctx, pg$connect$fn) {
  log(`${logPrefix}|pg$connect$1`);
  const pg$url = ctx.pg$url;
  return pg.connect(pg$url, (pg$connect$error, pg$client, pg$connect$done) => {
    log(`${logPrefix}|pg$connect$1|pg.connect`);
    promise$ctx.pg$connect$done = pg$connect$done;
    if (pg$connect$error) {
      error(`${logPrefix}|pg$connect$1|pg.connect|error`, pg$connect$error);
      done$reject(ctx, promise$ctx, pg$connect$error);
    } else {
      log(`${logPrefix}|pg$connect$1|pg.connect|success`);
      ctx.pg$client = pg$client;
      if (pg$connect$fn) {
        co(function *() {
          log(`${logPrefix}|pg$connect$1|pg.connect|success|co`);
          return yield pg$connect$fn();
        })
          .then(() => done$resolve(ctx, promise$ctx))
          .catch(error$ctx => {
            done$reject(ctx, promise$ctx, error$ctx)
          });
      } else {
        done$resolve(ctx, promise$ctx);
      }
    }
  });
}
function done$resolve(ctx, promise$ctx) {
  log(`${logPrefix}|done$resolve`);
  promise$ctx.pg$connect$done();
  promise$ctx.resolve(ctx);
}
function done$reject(ctx, promise$ctx, error$ctx) {
  log(`${logPrefix}|done$reject`);
  assign__error(ctx, error$ctx);
  promise$ctx.pg$connect$done();
  promise$ctx.reject(ctx, error$ctx);
}
export function *pg$query(ctx, ...ctx$clone$rest$$) {
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client
      , sql$$ = ctx$clone.pg$query$sql$$ || ctx$clone.pg$sql$$ || ctx$clone.sql$$ || ctx$clone.sql || [];
  log(`${logPrefix}|pg$query`, sql$$[0].slice(0, 256));
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg$query|Promise`);
      assign(ctx$clone, {resolve: resolve, reject: reject});
      let pg$query$$ = sql$$.concat(pg$query$done);
      pg$client.query(...pg$query$$);
    });
  function pg$query$done(ctx$err, pg$query$) {
    log(`${logPrefix}|pg$query|pg$query$done$fn`);
    const resolve = ctx$clone.resolve
        , reject = ctx$clone.reject;
    if (ctx$err) {
      error(`${logPrefix}|pg$query|pg$query$done$fn|error`, ctx$err);
      reject(assign(ctx$clone, {error$message: ctx$err}));
    } else {
      log(`${logPrefix}|pg$query|pg$query$done$fn|success`);
      resolve(assign(ctx, {pg$query$: pg$query$}));
    }
  }
}
export function *pg$transaction(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg$transaction`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$transaction$fn = ctx$clone.pg$transaction$fn || ctx$clone.fn;
  yield pg$begin(ctx, ...ctx$clone$rest$$);
  try {
    yield pg$transaction$fn(ctx, ...ctx$clone$rest$$);
    yield pg$commit(ctx, ...ctx$clone$rest$$);
  } catch (error$ctx) {
    yield pg$rollback(ctx, ...ctx$clone$rest$$);
    error$throw(ctx, error$ctx);
  }
}
export function *pg$begin(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg$begin`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client
      , pg$begin$sql = ctx$clone.pg$begin$sql$$ || ctx$clone.pg$sql$$ || ctx$clone.sql$$ || "BEGIN";
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg$begin|Promise`);
      pg$client.query(pg$begin$sql, error$message => {
        log(`${logPrefix}|pg$begin|Promise|query`);
        if (error$message) {
          error(`${logPrefix}|pg$begin|Promise|query|error`, error$message);
          reject(assign(ctx$clone, {error$message: error$message}));
        } else {
          log(`${logPrefix}|pg$begin|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}
export function *pg$commit(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg$commit`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg$commit|Promise`);
      pg$client.query("COMMIT", error$message => {
        log(`${logPrefix}|pg$commit|Promise|query`);
        if (error$message) {
          error(`${logPrefix}|pg$commit|Promise|query|error`, error$message);
          reject(assign(ctx$clone, {error$message: error$message}));
        } else {
          log(`${logPrefix}|pg$commit|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}
export function *pg$rollback(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg$rollback`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg$rollback|Promise`);
      pg$client.query("ROLLBACK", error$message => {
        log(`${logPrefix}|pg$rollback|Promise|query`);
        if (error$message) {
          error(`${logPrefix}|pg$rollback|Promise|query|error`, error$message);
          reject(assign(ctx$clone, {error$message: error$message}));
        } else {
          log(`${logPrefix}|pg$rollback|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}