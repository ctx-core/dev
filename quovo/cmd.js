import {
  http$get__account$$,
  http$get__user$account$$,
  http$get__brokerage$$,
  http$post__user$account$$,
  http$delete__account,
  http$post__account$sync,
  http$get__account$sync,
  http$get__account$$challenge$$,
  http$put__account$$challenge$$,
  http$post__user$iframe_token,
  http$get__portfolio$$,
  http$get__account$portfolio$$,
  http$get__portfolio$history,
  http$get__position$$,
  http$get__user$$,
  http$post__user$$
} from "ctx-core/quovo/fetch";
import {table__name__cmd__assign,call__cmd} from "ctx-core/cmd/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/cmd";
log(logPrefix);
table__name__cmd__assign({
  cmd__quovo$account$$: cmd__quovo$account$$,
  cmd__quovo$user$account$$: cmd__quovo$user$account$$,
  cmd__quovo$brokerage$$post: cmd__quovo$brokerage$$post,
  cmd__quovo$user$iframe$token$post: cmd__quovo$user$iframe$token$post,
  cmd__quovo$portfolio$$: cmd__quovo$portfolio$$,
  cmd__quovo$account$portfolio$$: cmd__quovo$account$portfolio$$,
  cmd__quovo$portfolio$history: cmd__quovo$portfolio$history,
  cmd__quovo$position$$: cmd__quovo$position$$,
  cmd__quovo$user$$post: cmd__quovo$user$$post,
  cmd__quovo$user$$: cmd__quovo$user$$
});
export function *cmd__quovo$account$$() {
  const cmd$key = "cmd__quovo$account$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$$"
    ],
    cmd$required: [
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$account$$) return;
    yield http$get__account$$(cmd$ctx);
    return {quovo$account$$: cmd$ctx.quovo$account$$};
  }
}
export function *cmd__quovo$user$account$$() {
  const cmd$key = "cmd__quovo$user$account$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$user$account$$",
      "quovo$user$id"
    ],
    cmd$required: [
      "quovo$user$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$user$account$$) return;
    if (cmd$ctx.quovo$user$id) {
      yield http$get__user$account$$(cmd$ctx);
    }
    return {quovo$user$account$$: cmd$ctx.quovo$user$account$$};
  }
}
export function *cmd__quovo$account$$post() {
  const cmd$key = "cmd__quovo$account$$post";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account",
      "quovo$account$id",
      "quovo$user$id",
      "quovo$brokerage$username",
      "quovo$brokerage$password"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$account || cmd$ctx.quovo$account$id) return;
    const quovo$brokerage$id = cmd$ctx.quovo$brokerage$id
        , quovo$brokerage$username = cmd$ctx.quovo$brokerage$username
        , quovo$brokerage$password = cmd$ctx.quovo$brokerage$password;
    yield http$post__user$account$$(cmd$ctx, {
      body: JSON.stringify({
        brokerage: quovo$brokerage$id,
        username: quovo$brokerage$username,
        password: quovo$brokerage$password
      })
    });
    return {
      quovo$account: cmd$ctx.quovo$account,
      quovo$account$id: cmd$ctx.quovo$account$id};
  }
}
export function *cmd__quovo$account$delete() {
  const cmd$key = "cmd__quovo$account$delete";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`, cmd$ctx.quovo$account$id);
    if (!cmd$ctx.quovo$account$id) return;
    yield http$delete__account(cmd$ctx);
    return {
      quovo$account: null,
      quovo$account$id: null
    };
  }
}
export function *cmd__quovo$account$sync$post() {
  const cmd$key = "cmd__quovo$account$sync$post";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id",
      "body"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (!cmd$ctx.quovo$account$id) return;
    yield http$post__account$sync(cmd$ctx);
    return {
      quovo$account$sync: cmd$ctx.quovo$account$sync
    };
  }
}
export function *cmd__quovo$user$account$$sync() {
  const cmd$key = "cmd__quovo$user$account$$sync";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (!cmd$ctx.quovo$account$id) return;
    yield http$post__account$sync(cmd$ctx);
    yield http$get__account$sync(cmd$ctx);
    return {
      quovo$account$sync: cmd$ctx.quovo$account$sync};
  }
}
export function *cmd__quovo$account$challenge$$() {
  const cmd$key = "cmd__quovo$account$challenge$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (!cmd$ctx.quovo$account$id) return;
    yield http$get__account$$challenge$$(cmd$ctx);
    return {
      quovo$account$challenge$$: cmd$ctx.quovo$account$challenge$$};
  }
}
export function *cmd__quovo$account$challenge$$put() {
  const cmd$key = "cmd__quovo$account$challenge$$put";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (!cmd$ctx.quovo$account$id) return;
    yield http$put__account$$challenge$$(cmd$ctx);
    return {
      quovo$account$challenge$$: cmd$ctx.quovo$account$challenge$$};
  }
}
export function *cmd__quovo$brokerage$$post() {
  const cmd$key = "cmd__quovo$brokerage$$post";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$brokerage$$) return;
    yield http$get__brokerage$$(cmd$ctx);
    return {quovo$brokerage$$: cmd$ctx.quovo$brokerage$$};
  }
}
export function *cmd__quovo$user$iframe$token$post() {
  const cmd$key = "cmd__quovo$user$iframe$token$post";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id",
      "quovo$user$id",
      "quovo$iframe$token",
      "quovo$iframe$url"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$iframe$token && cmd$ctx.quovo$iframe$url) return;
    yield http$post__user$iframe_token(cmd$ctx);
    return {
      quovo$iframe$token: cmd$ctx.quovo$iframe$token,
      quovo$iframe$url: cmd$ctx.quovo$iframe$url
    };
  }
}
export function *cmd__quovo$portfolio$history() {
  const cmd$key = "cmd__quovo$portfolio$history";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$portfolio$id"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$portfolio$history) return;
    yield http$get__portfolio$history(cmd$ctx);
    return {quovo$portfolio$history: cmd$ctx.quovo$portfolio$history};
  }
}
export function *cmd__quovo$portfolio$$() {
  const cmd$key = "cmd__quovo$portfolio$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id",
      "quovo$portfolio$$"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$portfolio$$) return;
    yield http$get__portfolio$$(cmd$ctx);
    return {quovo$portfolio$$: cmd$ctx.quovo$portfolio$$};
  }
}
export function *cmd__quovo$account$portfolio$$() {
  const cmd$key = "cmd__quovo$account$portfolio$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id",
      "quovo$account$portfolio$$"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$account$portfolio$$) return;
    yield http$get__account$portfolio$$(cmd$ctx);
    return {quovo$account$portfolio$$: cmd$ctx.quovo$account$portfolio$$};
  }
}
export function *cmd__quovo$position$$() {
  const cmd$key = "cmd__quovo$position$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo$account$id",
      "quovo$portfolio$id",
      "quovo$position$$"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$position$$) return;
    yield http$get__position$$(cmd$ctx);
    return {quovo$position$$: cmd$ctx.quovo$position$$};
  }
}
export function *cmd__quovo$user$$() {
  const cmd$key = "cmd__quovo$user$$";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    if (cmd$ctx.quovo$user$$) return;
    yield http$get__user$$(cmd$ctx);
    return {quovo$user$$: cmd$ctx.quovo$user$$};
  }
}
export function *cmd__quovo$user$$post() {
  const cmd$key = "cmd__quovo$user$$post";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "body"
    ],
    cmd__fn: cmd__fn
  });
  function *cmd__fn(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd__fn`);
    yield http$post__user$$(cmd$ctx);
    return {
      quovo$user: cmd$ctx.quovo$user,
      quovo$user$id: cmd$ctx.quovo$user$id
    };
  }
}