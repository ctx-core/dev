import {assign,clone} from "ctx-core/object/lib";
import {assign__error$ctx,throw__error} from "ctx-core/error/lib";
import pg from "pg";
import co from "co";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/pg/lib";
pg.defaults.ssl = true;
export function *pg__connect(ctx, pg__connect__fn) {
  log(`${logPrefix}|pg__connect`);
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg__connect|Promise`);
      pg__connect__private(ctx, {resolve: resolve, reject: reject}, pg__connect__fn)
    });
}
function pg__connect__private(ctx, promise$ctx, pg__connect__fn) {
  log(`${logPrefix}|pg__connect__private`);
  const pg$url = ctx.pg$url;
  return pg.connect(pg$url, (pg__connect$error, pg$client, pg__connect__done) => {
    log(`${logPrefix}|pg__connect__private|pg.connect`);
    promise$ctx.pg__connect__done = pg__connect__done;
    if (pg__connect$error) {
      error(`${logPrefix}|pg__connect__private|pg.connect|error`, pg__connect$error);
      done$reject(ctx, promise$ctx, pg__connect$error);
    } else {
      log(`${logPrefix}|pg__connect__private|pg.connect|success`);
      ctx.pg$client = pg$client;
      if (pg__connect__fn) {
        co(function *() {
          log(`${logPrefix}|pg__connect__private|pg.connect|success|co`);
          return yield pg__connect__fn();
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
  promise$ctx.pg__connect__done();
  promise$ctx.resolve(ctx);
}
function done$reject(ctx, promise$ctx, error$ctx) {
  log(`${logPrefix}|done$reject`);
  assign__error$ctx(ctx, error$ctx);
  promise$ctx.pg__connect__done();
  promise$ctx.reject(ctx, error$ctx);
}
export function *pg__query(ctx, ...ctx$clone$rest$$) {
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client
      , sql$$ = ctx$clone.pg__query$sql$$ || ctx$clone.pg$sql$$ || ctx$clone.sql$$ || ctx$clone.sql || [];
  log(`${logPrefix}|pg__query`, sql$$[0].slice(0, 256));
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg__query|Promise`);
      assign(ctx$clone, {resolve: resolve, reject: reject});
      let pg__query$$ = sql$$.concat(pg__query$done);
      pg$client.query(...pg__query$$);
    });
  function pg__query$done(ctx$err, pg__query$) {
    log(`${logPrefix}|pg__query|pg__query$done__fn`);
    const resolve = ctx$clone.resolve
        , reject = ctx$clone.reject;
    if (ctx$err) {
      error(`${logPrefix}|pg__query|pg__query$done__fn|error`, ctx$err);
      reject(assign(ctx$clone, {error_message: ctx$err}));
    } else {
      log(`${logPrefix}|pg__query|pg__query$done__fn|success`);
      resolve(assign(ctx, {pg__query$: pg__query$}));
    }
  }
}
export function *pg__transaction(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg__transaction`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg__transaction__fn = ctx$clone.pg__transaction__fn || ctx$clone.fn;
  yield pg__begin(ctx, ...ctx$clone$rest$$);
  try {
    yield pg__transaction__fn(ctx, ...ctx$clone$rest$$);
    yield pg__commit(ctx, ...ctx$clone$rest$$);
  } catch (error$ctx) {
    yield pg__rollback(ctx, ...ctx$clone$rest$$);
    throw__error(ctx, error$ctx);
  }
}
export function *pg__begin(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg__begin`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client
      , pg__begin$sql = ctx$clone.pg__begin$sql$$ || ctx$clone.pg$sql$$ || ctx$clone.sql$$ || "BEGIN";
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg__begin|Promise`);
      pg$client.query(pg__begin$sql, error_message => {
        log(`${logPrefix}|pg__begin|Promise|query`);
        if (error_message) {
          error(`${logPrefix}|pg__begin|Promise|query|error`, error_message);
          reject(assign(ctx$clone, {error_message: error_message}));
        } else {
          log(`${logPrefix}|pg__begin|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}
export function *pg__commit(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg__commit`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg__commit|Promise`);
      pg$client.query("COMMIT", error_message => {
        log(`${logPrefix}|pg__commit|Promise|query`);
        if (error_message) {
          error(`${logPrefix}|pg__commit|Promise|query|error`, error_message);
          reject(assign(ctx$clone, {error_message: error_message}));
        } else {
          log(`${logPrefix}|pg__commit|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}
export function *pg__rollback(ctx, ...ctx$clone$rest$$) {
  log(`${logPrefix}|pg__rollback`);
  const ctx$clone = clone(ctx, ...ctx$clone$rest$$)
      , pg$client = ctx$clone.pg$client;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|pg__rollback|Promise`);
      pg$client.query("ROLLBACK", error_message => {
        log(`${logPrefix}|pg__rollback|Promise|query`);
        if (error_message) {
          error(`${logPrefix}|pg__rollback|Promise|query|error`, error_message);
          reject(assign(ctx$clone, {error_message: error_message}));
        } else {
          log(`${logPrefix}|pg__rollback|Promise|query|success`);
          resolve(ctx$clone);
        }
      });
    }
  );
}