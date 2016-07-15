import {
  http$get__accounts,
  http$get__user__accounts,
  http$get__brokerages,
  http$post__user__accounts,
  http$delete__account,
  http$post__account__sync,
  http$get__account__sync,
  http$get__accounts__challenges,
  http$put__accounts__challenges,
  http$post__user__iframe_token,
  http$get__portfolios,
  http$get__accounts__portfolios,
  http$get__portfolio__history,
  http$get__positions,
  http$get__users,
  http$post__users
} from "ctx-core/quovo/fetch";
import {assert__authorization} from "ctx-core/auth/lib";
import {table__name__cmd__assign,call__cmd} from "ctx-core/cmd/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/cmd";
log(logPrefix);
table__name__cmd__assign({
  cmd__quovo__accounts: cmd__quovo__accounts,
  cmd__quovo__user__accounts: cmd__quovo__user__accounts,
  cmd__post__quovo__brokerages: cmd__post__quovo__brokerages,
  cmd__post__quovo__user__iframe__token: cmd__post__quovo__user__iframe__token,
  cmd__quovo__portfolios: cmd__quovo__portfolios,
  cmd__quovo__account__portfolios: cmd__quovo__account__portfolios,
  cmd__quovo__portfolio__history: cmd__quovo__portfolio__history,
  cmd__quovo__positions: cmd__quovo__positions,
  cmd__post__quovo__users: cmd__post__quovo__users,
  cmd__quovo__users: cmd__quovo__users
});
export function *cmd__quovo__accounts(ctx) {
  const cmd$key = "cmd__quovo__accounts";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__accounts"
    ],
    cmd$required: [
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__accounts) return;
    yield http$get__accounts(cmd$ctx);
    return {quovo__accounts: cmd$ctx.quovo__accounts};
  }
}
export function *cmd__quovo__user__accounts(ctx) {
  const cmd$key = "cmd__quovo__user__accounts";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__user__accounts",
      "quovo__user_id"
    ],
    cmd$required: [
      "quovo__user_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__user__accounts) return;
    if (cmd$ctx.quovo__user_id) {
      yield http$get__user__accounts(cmd$ctx);
    }
    return {quovo__user__accounts: cmd$ctx.quovo__user__accounts};
  }
}
export function *cmd__post__quovo__accounts(ctx) {
  const cmd$key = "cmd__post__quovo__accounts";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account",
      "quovo__account_id",
      "quovo__user_id",
      "quovo$brokerage$username",
      "quovo$brokerage$password"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__account || cmd$ctx.quovo__account_id) return;
    const quovo$brokerage$id = cmd$ctx.quovo$brokerage$id
        , quovo$brokerage$username = cmd$ctx.quovo$brokerage$username
        , quovo$brokerage$password = cmd$ctx.quovo$brokerage$password;
    yield http$post__user__accounts(cmd$ctx, {
      body: JSON.stringify({
        brokerage: quovo$brokerage$id,
        username: quovo$brokerage$username,
        password: quovo$brokerage$password
      })
    });
    return {
      quovo__account: cmd$ctx.quovo__account,
      quovo__account_id: cmd$ctx.quovo__account_id};
  }
}
export function *cmd__delete__quovo__account(ctx) {
  const cmd$key = "cmd__delete__quovo__account";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`, cmd$ctx.quovo__account_id);
    if (!cmd$ctx.quovo__account_id) return;
    yield http$delete__account(cmd$ctx);
    return {
      quovo__account: null,
      quovo__account_id: null
    };
  }
}
export function *cmd__post__quovo__account__sync(ctx) {
  const cmd$key = "cmd__post__quovo__account__sync";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id",
      "body"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (!cmd$ctx.quovo__account_id) return;
    yield http$post__account__sync(cmd$ctx);
    return {
      quovo__account__sync: cmd$ctx.quovo__account__sync
    };
  }
}
export function *cmd__quovo__user__account__sync(ctx) {
  const cmd$key = "cmd__quovo__user__account__sync";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (!cmd$ctx.quovo__account_id) return;
    yield http$post__account__sync(cmd$ctx);
    yield http$get__account__sync(cmd$ctx);
    return {
      quovo__account__sync: cmd$ctx.quovo__account__sync};
  }
}
export function *cmd__quovo__account__challenges(ctx) {
  const cmd$key = "cmd__quovo__account__challenges";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (!cmd$ctx.quovo__account_id) return;
    yield http$get__accounts__challenges(cmd$ctx);
    return {
      quovo__account__challenges: cmd$ctx.quovo__account__challenges};
  }
}
export function *cmd__put__quovo__account__challenges(ctx) {
  const cmd$key = "cmd__put__quovo__account__challenges";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (!cmd$ctx.quovo__account_id) return;
    yield http$put__accounts__challenges(cmd$ctx);
    return {
      quovo__account__challenges: cmd$ctx.quovo__account__challenges};
  }
}
export function *cmd__post__quovo__brokerages(ctx) {
  const cmd$key = "cmd__post__quovo__brokerages";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__brokerages) return;
    yield http$get__brokerages(cmd$ctx);
    return {quovo__brokerages: cmd$ctx.quovo__brokerages};
  }
}
export function *cmd__post__quovo__user__iframe__token(ctx) {
  const cmd$key = "cmd__post__quovo__user__iframe__token";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id",
      "quovo__user_id",
      "quovo__iframe$token",
      "quovo__iframe$url"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__iframe$token && cmd$ctx.quovo__iframe$url) return;
    yield http$post__user__iframe_token(cmd$ctx);
    return {
      quovo__iframe$token: cmd$ctx.quovo__iframe$token,
      quovo__iframe$url: cmd$ctx.quovo__iframe$url
    };
  }
}
export function *cmd__quovo__portfolio__history(ctx) {
  const cmd$key = "cmd__quovo__portfolio__history";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__portfolio_id"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__portfolio__history) return;
    yield http$get__portfolio__history(cmd$ctx);
    return {quovo__portfolio__history: cmd$ctx.quovo__portfolio__history};
  }
}
export function *cmd__quovo__portfolios(ctx) {
  const cmd$key = "cmd__quovo__portfolios";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id",
      "quovo__portfolios"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__portfolios) return;
    yield http$get__portfolios(cmd$ctx);
    return {quovo__portfolios: cmd$ctx.quovo__portfolios};
  }
}
export function *cmd__quovo__account__portfolios(ctx) {
  const cmd$key = "cmd__quovo__account__portfolios";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id",
      "quovo__account__portfolios"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__account__portfolios) return;
    yield http$get__accounts__portfolios(cmd$ctx);
    return {quovo__account__portfolios: cmd$ctx.quovo__account__portfolios};
  }
}
export function *cmd__quovo__positions(ctx) {
  const cmd$key = "cmd__quovo__positions";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "quovo__account_id",
      "quovo__portfolio_id",
      "quovo__positions"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__positions) return;
    yield http$get__positions(cmd$ctx);
    return {quovo__positions: cmd$ctx.quovo__positions};
  }
}
export function *cmd__quovo__users(ctx) {
  const cmd$key = "cmd__quovo__users";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    if (cmd$ctx.quovo__users) return;
    yield http$get__users(cmd$ctx);
    return {quovo__users: cmd$ctx.quovo__users};
  }
}
export function *cmd__post__quovo__users(ctx) {
  const cmd$key = "cmd__post__quovo__users";
  log(`${logPrefix}|${cmd$key}`);
  return yield call__cmd(...arguments, {
    cmd$key: cmd$key,
    cmd$whitelist: [
      "body"
    ],
    cmd: new__cmd(ctx, cmd)
  });
  function *cmd(cmd$ctx) {
    log(`${logPrefix}|${cmd$key}|cmd`);
    yield http$post__users(cmd$ctx);
    return {
      quovo__user: cmd$ctx.quovo__user,
      quovo__user_id: cmd$ctx.quovo__user_id
    };
  }
}
export function new__cmd(ctx, cmd) {
  log(`${logPrefix}|new__cmd`);
  return function *(){
    yield assert__authorization(ctx);
    return yield cmd(...arguments);
  };
}