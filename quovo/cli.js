#!/usr/bin/env babel-node
import co from "co";
import {assign,clone} from "ctx-core/object/lib";
import {array$concat} from "ctx-core/array/lib";
import env from "ctx-core/env";
import "ctx-core/quovo/env";
import {ensure__agents} from "ctx-core/agent/lib";
import {http$post__token} from "ctx-core/quovo/fetch";
import {
  get__quovo__accounts,
  post__quovo__accounts,
  delete__quovo__account,
  post__quovo__account__sync,
  get__quovo__user__account__sync,
  get__quovo__account__challenges,
  put__quovo__account__challenges,
  post__quovo__brokerages,
  get__quovo__users
} from "ctx-core/quovo/rpc";
import {timedout} from "ctx-core/time/lib";
import Vorpal from "vorpal";
import inquirer from 'inquirer';
import autocomplete from "inquirer-autocomplete-prompt";
import table from "text-table";
import {log,debug} from "ctx-core/logger/lib"
const cli = Vorpal()
    , logPrefix = "ctx-core/quovo/cli";
let cli$ctx;
inquirer.registerPrompt("autocomplete", autocomplete);
apply__cli$command();
reset__cli$ctx();
cli.delimiter("quovo/cli$").show();
function apply__cli$command() {
  cli.command("mfa", "{brokerage,user}: quovo mfa flow")
    .action(co.wrap(cli$mfa));
  cli.command("account [account]", "{account}: get/set quovo__account")
    .option("-s, --set")
    .option("-d, --delete")
    .action(co.wrap(cli$account));
  cli.command("account= [account]", "{account}: set quovo__account")
    .action(co.wrap(cli$set(cli$account)));
  cli.command("account! [account]", "{account}: delete quovo__account")
    .action(co.wrap(cli$delete(cli$account)));
  cli.command("brokerage [brokerage]", "{brokerage}: get/set quovo$brokerage")
    .option("-s, --set")
    .action(co.wrap(cli$brokerage));
  cli.command("brokerage= [brokerage]", "{brokerage}: set quovo$brokerage")
    .action(co.wrap(cli$set(cli$brokerage)));
  cli.command("user [user]", "{user}: get/set quovo__username")
    .option("-s, --set")
    .action(co.wrap(cli$user));
  cli.command("user= [user]", "{user}: set quovo__username")
    .action(co.wrap(cli$set(cli$user)));
  cli.command("accounts", "{accounts}: list accounts for quovo__username")
    .action(co.wrap(cli$accounts));
  cli.command("reset cache", "resets the cached quovo data")
    .action(co.wrap(cli$cache$reset));
  cli.command("reset all", "resets this session data to the defaults")
    .action(co.wrap(cli$reset));
  cli.command("users", "{users}: list quovo users")
    .action(co.wrap(cli$users));
}
function cli$set(fn) {
  return function *set__fn(opts$ctx) {
    opts$ctx.options.set = true;
    return yield fn(opts$ctx);
  }
}
function cli$delete(fn) {
  return function *delete__fn(opts$ctx) {
    opts$ctx.options.delete = true;
    return yield fn(opts$ctx);
  }
}
function *cli$mfa() {
  log(`${logPrefix}|cli$mfa`);
  yield cli$ctx.quovo__access_token__agent();
  yield [cli$ctx.quovo__brokerages__agent(), cli$ctx.quovo__users__agent()];
  const quovo__user = assign__quovo__user()
      , quovo$brokerage = find__quovo$brokerage()
      ;
  if (!(yield prompt$confirm__new$account())) return cli$ctx;
  cli$ctx.quovo$brokerage = quovo$brokerage;
  cli$ctx.quovo__user = quovo__user;
  assign(cli$ctx, {quovo__account: null, quovo__account_id: null});
  const quovo$brokerage$username = yield prompt$input__quovo$brokerage$username()
      , quovo$brokerage$password = yield prompt$input__quovo$brokerage$password();
  yield post__quovo__accounts(cli$ctx, {
          data: JSON.stringify({
            user: cli$ctx.quovo__user_id,
            brokerage: cli$ctx.quovo$brokerage$id,
            username: quovo$brokerage$username,
            password: quovo$brokerage$password
          })
        });
  try {
    yield quovo__account__challenge();
    yield get__quovo__user__account__sync(cli$ctx);
    cli.log(`quovo__account_id: ${cli$ctx.quovo__account_id}`);
    cli$log__quovo__user__account__sync(cli$ctx);
    cli.log(`TODO: mfa|${table$row(quovo__user$row(assign__quovo__user()))}`);
  } finally {
    if (yield prompt$confirm__del$account()) {
      yield delete__quovo__account(cli$ctx);
    }
  }
  return cli$ctx;
  function cli$log__quovo__user__account__sync() {
    cli.log(`${logPrefix}|cli$log__quovo__user__account__sync`, JSON.stringify({sync: cli$ctx.quovo__account__sync}, null, 2));
  }
  function *prompt$confirm__new$account() {
    const quovo__username = quovo__user.username
        , quovo$brokerage$name = quovo$brokerage.name;
    if (!quovo__username) {
      cli.log("user does not exist");
      return false;
    }
    if (!quovo$brokerage$name) {
      cli.log("brokerage does not exist");
      return false;
    }
    return yield prompt({
      type: "confirm",
      message: `new account for ${JSON.stringify({username: quovo__username, brokerage_name: quovo$brokerage$name})}`
    });
  }
  function *prompt$input__quovo$brokerage$username() {
    const quovo$brokerage$name = quovo$brokerage.name;
    if (!quovo$brokerage$name) {
      cli.log("brokerage does not exist");
      return false;
    }
    return yield prompt({
      type: "input",
      message: `brokerage ${quovo$brokerage$name} username`
    });
  }
  function *prompt$input__quovo$brokerage$password() {
    const quovo$brokerage$name = quovo$brokerage.name;
    if (!quovo$brokerage$name) {
      cli.log("brokerage does not exist");
      return false;
    }
    return yield prompt({
      type: "password",
      message: `brokerage ${quovo$brokerage$name} password`
    });
  }
  function *prompt$confirm__del$account() {
    const quovo__account = cli$ctx.quovo__account;
    if (!quovo__account) {
      cli.log(`account ${cli$ctx.quovo__account_id} does not exist`);
      return false;
    }
    return yield prompt({
      type: "confirm",
      message: `delete created account ${table$row(quovo__account$row(quovo__account))}`
    });
  }
  function *quovo__account__challenge() {
    while(true) {
      yield post__quovo__account__sync(cli$ctx);
      yield waitFor__quovo__user__account__sync();
      yield get__quovo__account__challenges(cli$ctx);
      const quovo__account__challenge__unanswered = (cli$ctx.quovo__account__challenges||[]).find(
              quovo__account__challenge => !quovo__account__challenge.is_answered);
      if (!quovo__account__challenge__unanswered) break;
      const quovo__account__challenge__unanswered_question = quovo__account__challenge__unanswered.question
          , quovo__account__challenge__unanswered_choices = quovo__account__challenge__unanswered.choices;
      let choice$answer;
      if (quovo__account__challenge__unanswered_choices) {
        const choice$row$$ = quovo__account__challenge__unanswered_choices.map(
                (choice, i) => [i, choice.category, choice.value])
            , choice = yield prompt({
                type: "autocomplete",
                message: quovo__account__challenge__unanswered_question,
                source: autocomplete$source(choice$row$$)
              });
        choice$answer = choice$value(choice);
      } else {
        choice$answer = yield prompt({
          type: "input",
          message: quovo__account__challenge__unanswered_question,
          source: autocomplete$source(choice$row$$)
        });
      }
      yield put__quovo__account__challenges(cli$ctx, {
        question: quovo__account__challenge__unanswered_question,
        answer: choice$answer});
      if (quovo__account__challenge__unanswered.type == "realtime") break;
    }
  }
  function *waitFor__quovo__user__account__sync() {
    const start = new Date();
    while (!cli$ctx || !cli$ctx.quovo__account__sync || cli$ctx.quovo__account__sync.progress || !timedout(start, 10000)) {
      yield get__quovo__user__account__sync(cli$ctx);
      cli$log__quovo__user__account__sync(cli$ctx);
    }
    return cli$ctx;
  }
}
function *cli$account(opts$ctx) {
  log(`${logPrefix}|cli$account`);
  yield assign__cli$account__cli$ctx(opts$ctx);
  if (!opts$ctx.options.delete) {
    cli.log(
      cli$ctx.quovo__account ?
        table$row(quovo__account$row(cli$ctx.quovo__account)) :
        "no account: use `account=` to select a quovo__account");
  }
  return cli$ctx;
}
function *assign__cli$account__cli$ctx(opts$ctx) {
  log(`${logPrefix}|assign__cli$account__cli$ctx`);
  yield cli$ctx.quovo__access_token__agent();
  yield cli$ctx.quovo__accounts__agent();
  if (!cli$ctx.quovo__account) refresh__quovo__account();
  const quovo__accounts = cli$ctx.quovo__accounts
      , options$set = opts$ctx.options.set
      , options$delete = opts$ctx.options.delete;
  if (options$set || options$delete) {
    let quovo__account_id = parseInt(opts$ctx.account);
    if (!quovo__account_id) {
      const account$choice = yield prompt__autocomplete$account();
      quovo__account_id = parseInt(choice$value(account$choice)||0);
      if (!quovo__account_id) return cli$ctx;
    }
    cli$ctx.quovo__account_id = quovo__account_id;
  }
  refresh__quovo__account();
  if (options$delete) {
    if (yield prompt__confirm$delete()) yield delete__quovo__account({});
  }
  return cli$ctx;
  function refresh__quovo__account() {
    cli$ctx.quovo__account = find__quovo__account();
  }
  function *prompt__autocomplete$account() {
    const quovo__account$rows = account$table().split("\n");
    find__quovo__account();
    const quovo__account = cli$ctx.quovo__account;
    let message = "select an account:";
    if (quovo__account) {
      message = `${message} current(${table$row(quovo__account$row(quovo__account))})`
    }
    return yield prompt({
      type: "autocomplete",
      message: message,
      source: autocomplete$source(quovo__account$rows, array$slice$50)
    });
  }
  function account$table() {
    return table(
      array$concat(
        [["0", "(cancel)", ""]],
        quovo__accounts.map(quovo__account => quovo__account$row(quovo__account))));
  }
  function *prompt__confirm$delete() {
    const quovo__account = cli$ctx.quovo__account;
    if (!quovo__account) {
      cli.log(`account ${cli$ctx.quovo__account_id} does not exist`);
      return false;
    }
    return yield prompt({
      type: "confirm",
      default: false,
      message: `delete ${table$row(quovo__account$row(quovo__account))}`
    });
  }
}
function find__quovo__account() {
  return cli$ctx.quovo__accounts.find(
    quovo__account =>
      quovo__account.id == cli$ctx.quovo__account_id);
}
function *cli$brokerage(opts$ctx) {
  log(`${logPrefix}|cli$brokerage`);
  yield assign__brokerage$cli__cli$ctx(opts$ctx);
  const quovo$brokerage = cli$ctx.quovo$brokerage;
  cli.log(quovo$brokerage ?
    table$row(quovo$brokerage$row(quovo$brokerage)) :
    "no brokerage: use `brokerage=` to select a quovo$brokerage");
  return cli$ctx;
}
function *assign__brokerage$cli__cli$ctx(ctx) {
  yield cli$ctx.quovo__access_token__agent();
  yield cli$ctx.quovo__brokerages__agent();
  if (!cli$ctx.quovo$brokerage) refresh__quovo$brokerage();
  const quovo__brokerages = ctx.quovo__brokerages;
  if (ctx.options.set) {
    let brokerage$id = parseInt(ctx.brokerage);
    if (!brokerage$id) {
      const brokerage$choice = yield prompt__autocomplete$brokerage();
      brokerage$id = parseInt(choice$value(brokerage$choice)||0);
      if (!brokerage$id) return cli$ctx;
    }
    cli$ctx.quovo$brokerage$id = brokerage$id;
  }
  refresh__quovo$brokerage();
  return cli$ctx;
  function refresh__quovo$brokerage() {
    cli$ctx.quovo$brokerage = find__quovo$brokerage();
  }
  function prompt__autocomplete$brokerage() {
    const quovo$brokerage$rows = brokerage$table().split("\n");
    return prompt([{
      type: "autocomplete",
      message: `select a brokerage: current(${table$row(quovo$brokerage$row(find__quovo$brokerage()))})`,
      source: autocomplete$source(quovo$brokerage$rows, array$slice$50)
    }])
  }
  function brokerage$table() {
    return table(
      array$concat(
        [["0", "(cancel)"]],
        quovo__brokerages.map(quovo$brokerage => quovo$brokerage$row(quovo$brokerage))
      ));
  }
}
function find__quovo$brokerage() {
  return cli$ctx.
    quovo__brokerages.
    find(
      quovo$brokerage =>
        quovo$brokerage.id == cli$ctx.quovo$brokerage$id);
}
function *cli$user(opts$ctx) {
  log(`${logPrefix}|cli$user`);
  yield assign__cli$user__cli$ctx(opts$ctx);
  cli.log(cli$ctx.quovo__user ?
    table$row(
      quovo__user$row(cli$ctx.quovo__user)) :
    "no user: use `user=` to select a quovo__user");
  return cli$ctx;
}
function *assign__cli$user__cli$ctx(opts$ctx) {
  log(`${logPrefix}|assign__cli$user__cli$ctx`);
  yield cli$ctx.quovo__access_token__agent();
  yield cli$ctx.quovo__users__agent();
  if (!cli$ctx.quovo__user) refresh__quovo__user();
  const ctx = assign(opts$ctx)
      , quovo__users = ctx.quovo__users;
  let quovo__username = opts$ctx.quovo__username;
  if (!quovo__username) {
    const user$choice = yield prompt__autocomplete$user()
        , quovo__user_id = parseInt(choice$value(user$choice)||0);
    if (!quovo__user_id) return cli$ctx;
    cli$ctx.quovo__user_id = quovo__user_id;
    cli$ctx.quovo__username = choice$value(user$choice, 1);
  }
  cli$ctx.quovo__username = quovo__username;
  refresh__quovo__user();
  return cli$ctx;
  function refresh__quovo__user() {
    cli$ctx.quovo__user = assign__quovo__user();
  }
  function *prompt__autocomplete$user() {
    const quovo__user$rows = user$table().split("\n");
    assign__quovo__user();
    const quovo__username = cli$ctx.quovo__username;
    let message = "select a user:";
    if (quovo__username) {
      message = `${message} current(${table$row(quovo__user$row(quovo__username))})`;
    }
    return yield prompt({
      type: "autocomplete",
      message: message,
      source: autocomplete$source(quovo__user$rows, array$slice$50)
    });
  }
  function user$table() {
    return table(
      array$concat(
        [["0", "(cancel)"]],
        quovo__users.map(quovo__user => quovo__user$row(quovo__user))
      ));
  }
}
function autocomplete$source(rows, filter=v=>v) {
  return (choices, input) =>
    new Promise(resolve =>
      resolve(
        filter(autocomplete$row$$filter$$(rows, input))))
}
function autocomplete$row$$filter$$(rows, input) {
  return rows.filter(
    row => new RegExp(input || ".", "i").exec(row) !== null
  )
}
function array$slice$50(rows) {
  return rows.slice(0,50);
}
function assign__quovo__user() {
  return cli$ctx.quovo__users.find(
    quovo__user =>
      quovo__user.username == cli$ctx.quovo__username);
}
function table$row(row) {
  return table([row]);
}
function quovo__account$row(quovo__account) {
  return [
          quovo__account.id||"",
          quovo__account.username||"",
          quovo__account.user||"",
          quovo__account.brokerage_name||"",
          quovo__account.status||""
        ];
}
function quovo$brokerage$row(quovo$brokerage) {
  return [
    (quovo$brokerage&&quovo$brokerage.id)||"",
    (quovo$brokerage&&quovo$brokerage.name)||""];
}
function quovo__user$row(quovo__user) {
  return [
    (quovo__user&&quovo__user.id)||"",
    (quovo__user&&quovo__user.username)||""];
}
function choice$value(choice, index=0) {
  return choice.split(/  +/)[index];
}
function *cli$accounts(opts$ctx) {
  log(`${logPrefix}|cli$accounts`);
  yield cli$ctx.quovo__access_token__agent();
  yield cli$ctx.quovo__accounts__agent();
  cli$ctx.quovo__accounts = cli$ctx.quovo__accounts;
  cli.log(
    table(
      array$concat(
        [["id", "username", "user", "brokerage_name", "status"]],
        cli$ctx.quovo__accounts.map(
          quovo__account =>
            quovo__account$row(quovo__account)))));
  return cli$ctx;
}
function *cli$cache$reset() {
  log(`${logPrefix}|cli$cache$reset`);
  delete cli$ctx.quovo__accounts;
  delete cli$ctx.quovo__users;
}
function *cli$reset() {
  log(`${logPrefix}|cli$reset`);
  return reset__cli$ctx();
}
function *cli$users(opts$ctx) {
  log(`${logPrefix}|cli$users`);
  yield cli$ctx.quovo__access_token__agent();
  yield cli$ctx.quovo__users__agent();
  cli.log(
    table(
      array$concat(
        [["id", "username", "name", "email"]],
        cli$ctx.quovo__users.map(
          quovo__user => [
            quovo__user.id||"",
            quovo__user.username||"",
            quovo__user.name||"",
            quovo__user.email||""])
      )));
  return cli$ctx;
}
function reset__cli$ctx() {
  log(`${logPrefix}|reset__cli$ctx`);
  cli$ctx = {
    quovo__account_id: env.QUOVO_ACCOUNT_ID_DEMO,
    quovo$brokerage$id: env.QUOVO_BROKERAGE_ID_DEMO,
    quovo__user_id: env.QUOVO_USER_ID_DEMO,
    quovo__username: env.QUOVO_USERNAME_DEMO
  };
  ensure__agents(cli$ctx, {
    scope: ["quovo__access_token", "quovo__access_token__expires"],
    key: "quovo__access_token__agent",
    ttl: true,
    reset: function *() {
      log(`${logPrefix}|reset__cli$ctx|quovo__access_token__agent|reset`);
      return yield http$post__token(cli$ctx)
    }
  }, {
    scope: ["quovo__accounts"],
    key: "quovo__accounts__agent",
    ttl: true,
    reset: function *() {
      log(`${logPrefix}|reset__cli$ctx|quovo__accounts__agent|reset`);
      return yield get__quovo__accounts(cli$ctx);
    }
  }, {
    scope: ["quovo__brokerages"],
    key: "quovo__brokerages__agent",
    ttl: true,
    reset: function *() {
      log(`${logPrefix}|reset__cli$ctx|quovo__brokerages__agent|reset`);
      return yield post__quovo__brokerages(cli$ctx)
    }
  }, {
    scope: ["quovo__users"],
    key: "quovo__users__agent",
    ttl: true,
    reset: function *() {
      log(`${logPrefix}|reset__cli$ctx|quovo__users__agent|reset`);
      return yield get__quovo__users(cli$ctx);
    }
  });
  return cli$ctx;
}
function *prompt(ctx, cb) {
  return yield new Promise(resolve => {
    return inquirer.prompt(
      clone({name: "value"}, ctx),
      cb||(answer => resolve(answer.value)));
  });
}