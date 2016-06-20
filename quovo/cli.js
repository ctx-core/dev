#!/usr/bin/env babel-node
import fs from "fs";
import co from "co";
import {assign,clone,keys} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import env from "ctx-core/env";
import "ctx-core/quovo_demo/env";
import {assign__agent$$} from "ctx-core/agent/lib";
import {fn$quovo$access_token} from "./xhr";
import {
  quovo$account$$cmd,
  quovo$account$$post$cmd,
  quovo$account$delete$cmd,
  quovo$account$sync$post$cmd,
  quovo$user$account$$sync$cmd,
  quovo$account$challenge$$cmd,
  quovo$account$challenge$$put$cmd,
  quovo$brokerage$$post$cmd,
  quovo$user$$cmd
} from "./cmd";
import {array$uniq$$} from "ctx-core/array/lib";
import {timedout} from "ctx-core/time/lib";
import Vorpal from "vorpal";
import inquirer from 'inquirer';
import autocomplete from "inquirer-autocomplete-prompt";
import table from "text-table";
import {info,log,debug} from "ctx-core/logger/lib"
const cli = Vorpal()
    , logPrefix = "ctx-core/quovo/cli";
let cli$ctx;
inquirer.registerPrompt("autocomplete", autocomplete);
cli$command$apply();
cli$ctx$reset();
cli.delimiter("quovo/cli$").show();
function cli$command$apply() {
  cli.command("mfa", "{brokerage,user}: quovo mfa flow")
    .action(co.wrap(cli$mfa));
  cli.command("account [account]", "{account}: get/set quovo$account")
    .option("-s, --set")
    .option("-d, --delete")
    .action(co.wrap(cli$account));
  cli.command("account= [account]", "{account}: set quovo$account")
    .action(co.wrap(cli$set$fn(cli$account)));
  cli.command("account! [account]", "{account}: delete quovo$account")
    .action(co.wrap(cli$delete$fn(cli$account)));
  cli.command("brokerage [brokerage]", "{brokerage}: get/set quovo$brokerage")
    .option("-s, --set")
    .action(co.wrap(cli$brokerage));
  cli.command("brokerage= [brokerage]", "{brokerage}: set quovo$brokerage")
    .action(co.wrap(cli$set$fn(cli$brokerage)));
  cli.command("user [user]", "{user}: get/set quovo$username")
    .option("-s, --set")
    .action(co.wrap(cli$user));
  cli.command("user= [user]", "{user}: set quovo$username")
    .action(co.wrap(cli$set$fn(cli$user)));
  cli.command("accounts", "{accounts}: list accounts for quovo$username")
    .action(co.wrap(cli$accounts));
  cli.command("reset cache", "resets the cached quovo data")
    .action(co.wrap(cli$cache$reset));
  cli.command("reset all", "resets this session data to the defaults")
    .action(co.wrap(cli$reset));
  cli.command("users", "{users}: list quovo users")
    .action(co.wrap(cli$users));
}
function cli$set$fn(fn) {
  return function *set$fn(opts$ctx) {
    opts$ctx.options.set = true;
    return yield fn(opts$ctx);
  }
}
function cli$delete$fn(fn) {
  return function *delete$fn(opts$ctx) {
    opts$ctx.options.delete = true;
    return yield fn(opts$ctx);
  }
}
function *cli$mfa() {
  log(`${logPrefix}|cli$mfa`);
  yield cli$ctx.quovo$access_token$agent();
  yield [cli$ctx.quovo$brokerage$$agent(), cli$ctx.quovo$user$$agent()];
  const quovo$user = assign__quovo$user()
      , quovo$brokerage = quovo$brokerage$find()
      ;
  if (!(yield prompt$confirm__new$account())) return cli$ctx;
  cli$ctx.quovo$brokerage = quovo$brokerage;
  cli$ctx.quovo$user = quovo$user;
  assign(cli$ctx, {quovo$account: null, quovo$account$id: null});
  const quovo$brokerage$username = yield prompt$input__quovo$brokerage$username()
      , quovo$brokerage$password = yield prompt$input__quovo$brokerage$password();
  yield quovo$account$$post$cmd(cli$ctx, {
          data: JSON.stringify({
            user: cli$ctx.quovo$user$id,
            brokerage: cli$ctx.quovo$brokerage$id,
            username: quovo$brokerage$username,
            password: quovo$brokerage$password
          })
        });
  try {
    yield quovo$account__challenge();
    yield quovo$user$account$$sync$cmd(cli$ctx);
    cli.log(`quovo$account$id: ${cli$ctx.quovo$account$id}`);
    cli$log__quovo$accountSync(cli$ctx);
    cli.log(`TODO: mfa|${table$row(quovo$user$row(assign__quovo$user()))}`);
  } finally {
    if (yield prompt$confirm__del$account()) {
      yield quovo$account$delete$cmd(cli$ctx);
    }
  }
  return cli$ctx;
  function cli$log__quovo$accountSync() {
    cli.log(`${logPrefix}|cli$log__quovo$accountSync`, JSON.stringify({sync: cli$ctx.quovo$account$sync}, null, 2));
  }
  function *prompt$confirm__new$account() {
    const quovo$username = quovo$user.username
        , quovo$brokerage$name = quovo$brokerage.name;
    if (!quovo$username) {
      cli.log("user does not exist");
      return false;
    }
    if (!quovo$brokerage$name) {
      cli.log("brokerage does not exist");
      return false;
    }
    return yield prompt({
      type: "confirm",
      message: `new account for ${JSON.stringify({username: quovo$username, brokerage_name: quovo$brokerage$name})}`
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
    const quovo$account = cli$ctx.quovo$account;
    if (!quovo$account) {
      cli.log(`account ${cli$ctx.quovo$account$id} does not exist`);
      return false;
    }
    return yield prompt({
      type: "confirm",
      message: `delete created account ${table$row(quovo$account$row(quovo$account))}`
    });
  }
  function *quovo$account__challenge() {
    while(true) {
      yield quovo$account$sync$post$cmd(cli$ctx);
      yield waitFor__quovo$accountSync();
      yield quovo$account$challenge$$cmd(cli$ctx);
      const quovo$accountChallenge_unanswered = (cli$ctx.quovo$account$challenge$$||[]).find(
              quovo$accountChallenge => !quovo$accountChallenge.is_answered);
      if (!quovo$accountChallenge_unanswered) break;
      const quovo$accountChallenge_unanswered_question = quovo$accountChallenge_unanswered.question
          , quovo$accountChallenge_unanswered_choices = quovo$accountChallenge_unanswered.choices;
      let choice$answer;
      if (quovo$accountChallenge_unanswered_choices) {
        const choice$row$$ = quovo$accountChallenge_unanswered_choices.map(
                (choice, i) => [i, choice.category, choice.value])
            , choice = yield prompt({
                type: "autocomplete",
                message: quovo$accountChallenge_unanswered_question,
                source: autocomplete$source(choice$row$$)
              });
        choice$answer = choice$value(choice);
      } else {
        choice$answer = yield prompt({
          type: "input",
          message: quovo$accountChallenge_unanswered_question,
          source: autocomplete$source(choice$row$$)
        });
      }
      yield quovo$account$challenge$$put$cmd(cli$ctx, {
        question: quovo$accountChallenge_unanswered_question,
        answer: choice$answer});
      if (quovo$accountChallenge_unanswered.type == "realtime") break;
    }
  }
  function *waitFor__quovo$accountSync() {
    const start = new Date();
    while (!cli$ctx || !cli$ctx.quovo$account$sync || cli$ctx.quovo$account$sync.progress || !timedout(start, 10000)) {
      yield quovo$user$account$$sync$cmd(cli$ctx);
      cli$log__quovo$accountSync(cli$ctx);
    }
    return cli$ctx;
  }
}
function *cli$account(opts$ctx) {
  log(`${logPrefix}|cli$account`);
  yield cli$account__cli$ctx$assign(opts$ctx);
  if (!opts$ctx.options.delete) {
    cli.log(
      cli$ctx.quovo$account ?
        table$row(quovo$account$row(cli$ctx.quovo$account)) :
        "no account: use `account=` to select a quovo$account");
  }
  return cli$ctx;
}
function *cli$account__cli$ctx$assign(opts$ctx) {
  log(`${logPrefix}|cli$account__cli$ctx$assign`);
  yield cli$ctx.quovo$access_token$agent();
  yield cli$ctx.quovo$account$$_agent();
  if (!cli$ctx.quovo$account) quovo$account$refresh();
  const quovo$account$$ = cli$ctx.quovo$account$$
      , options$set = opts$ctx.options.set
      , options$delete = opts$ctx.options.delete;
  if (options$set || options$delete) {
    let quovo$account$id = parseInt(opts$ctx.account);
    if (!quovo$account$id) {
      const account$choice = yield prompt$autocomplete$account();
      quovo$account$id = parseInt(choice$value(account$choice)||0);
      if (!quovo$account$id) return cli$ctx;
    }
    cli$ctx.quovo$account$id = quovo$account$id;
  }
  quovo$account$refresh();
  if (options$delete) {
    if (yield prompt$confirm$delete()) yield quovo$account$delete$cmd({});
  }
  return cli$ctx;
  function quovo$account$refresh() {
    cli$ctx.quovo$account = quovo$account$find();
  }
  function *prompt$autocomplete$account() {
    const quovo$account$rows = account$table().split("\n");
    quovo$account$find();
    const quovo$account = cli$ctx.quovo$account;
    let message = "select an account:";
    if (quovo$account) {
      message = `${message} current(${table$row(quovo$account$row(quovo$account))})`
    }
    return yield prompt({
      type: "autocomplete",
      message: message,
      source: autocomplete$source(quovo$account$rows, array$slice$$50$$)
    });
  }
  function account$table() {
    return table(
      array$concat$$(
        [["0", "(cancel)", ""]],
        quovo$account$$.map(quovo$account => quovo$account$row(quovo$account))));
  }
  function *prompt$confirm$delete() {
    const quovo$account = cli$ctx.quovo$account;
    if (!quovo$account) {
      cli.log(`account ${cli$ctx.quovo$account$id} does not exist`);
      return false;
    }
    return yield prompt({
      type: "confirm",
      default: false,
      message: `delete ${table$row(quovo$account$row(quovo$account))}`
    });
  }
}
function quovo$account$find() {
  return cli$ctx.quovo$account$$.find(
    quovo$account =>
      quovo$account.id == cli$ctx.quovo$account$id);
}
function *cli$brokerage(opts$ctx) {
  log(`${logPrefix}|cli$brokerage`);
  yield brokerage$cli__cli$ctx$assign(opts$ctx);
  const quovo$brokerage = cli$ctx.quovo$brokerage;
  cli.log(quovo$brokerage ?
    table$row(quovo$brokerage$row(quovo$brokerage)) :
    "no brokerage: use `brokerage=` to select a quovo$brokerage");
  return cli$ctx;
}
function *brokerage$cli__cli$ctx$assign(ctx) {
  yield cli$ctx.quovo$access_token$agent();
  yield cli$ctx.quovo$brokerage$$agent();
  if (!cli$ctx.quovo$brokerage) quovo$brokerage$refresh();
  const quovo$brokerage$$ = ctx.quovo$brokerage$$;
  if (ctx.options.set) {
    let brokerage$id = parseInt(ctx.brokerage);
    if (!brokerage$id) {
      const brokerage$choice = yield prompt$autocomplete$brokerage();
      brokerage$id = parseInt(choice$value(brokerage$choice)||0);
      if (!brokerage$id) return cli$ctx;
    }
    cli$ctx.quovo$brokerage$id = brokerage$id;
  }
  quovo$brokerage$refresh();
  return cli$ctx;
  function quovo$brokerage$refresh() {
    cli$ctx.quovo$brokerage = quovo$brokerage$find();
  }
  function prompt$autocomplete$brokerage() {
    const quovo$brokerage$rows = brokerage$table().split("\n");
    return prompt([{
      type: "autocomplete",
      message: `select a brokerage: current(${table$row(quovo$brokerage$row(quovo$brokerage$find()))})`,
      source: autocomplete$source(quovo$brokerage$rows, array$slice$$50$$)
    }])
  }
  function brokerage$table() {
    return table(
      array$concat$$(
        [["0", "(cancel)"]],
        quovo$brokerage$$.map(quovo$brokerage => quovo$brokerage$row(quovo$brokerage))
      ));
  }
}
function quovo$brokerage$find() {
  return cli$ctx.
    quovo$brokerage$$.
    find(
      quovo$brokerage =>
        quovo$brokerage.id == cli$ctx.quovo$brokerage$id);
}
function *cli$user(opts$ctx) {
  log(`${logPrefix}|cli$user`);
  yield cli$user__cli$ctx$assign(opts$ctx);
  cli.log(cli$ctx.quovo$user ?
    table$row(
      quovo$user$row(cli$ctx.quovo$user)) :
    "no user: use `user=` to select a quovo$user");
  return cli$ctx;
}
function *cli$user__cli$ctx$assign(opts$ctx) {
  log(`${logPrefix}|cli$user__cli$ctx$assign`);
  yield cli$ctx.quovo$access_token$agent();
  yield cli$ctx.quovo$user$$agent();
  if (!cli$ctx.quovo$user) quovo$user$refresh();
  const ctx = assign(opts$ctx)
      , quovo$user$$ = ctx.quovo$user$$;
  let quovo$username = opts$ctx.quovo$username;
  if (!quovo$username) {
    const user$choice = yield prompt$autocomplete$user()
        , quovo$user$id = parseInt(choice$value(user$choice)||0);
    if (!quovo$user$id) return cli$ctx;
    cli$ctx.quovo$user$id = quovo$user$id;
    cli$ctx.quovo$username = choice$value(user$choice, 1);
  }
  cli$ctx.quovo$username = quovo$username;
  quovo$user$refresh();
  return cli$ctx;
  function quovo$user$refresh() {
    cli$ctx.quovo$user = assign__quovo$user();
  }
  function *prompt$autocomplete$user() {
    const quovo$user$rows = user$table().split("\n");
    assign__quovo$user();
    const quovo$username = cli$ctx.quovo$username;
    let message = "select a user:";
    if (quovo$username) {
      message = `${message} current(${table$row(quovo$user$row(quovo$username))})`;
    }
    return yield prompt({
      type: "autocomplete",
      message: message,
      source: autocomplete$source(quovo$user$rows, array$slice$$50$$)
    });
  }
  function user$table() {
    return table(
      array$concat$$(
        [["0", "(cancel)"]],
        quovo$user$$.map(quovo$user => quovo$user$row(quovo$user))
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
function array$slice$$50$$(rows) {
  return rows.slice(0,50);
}
function assign__quovo$user() {
  return cli$ctx.quovo$user$$.find(
    quovo$user =>
      quovo$user.username == cli$ctx.quovo$username);
}
function table$row(row) {
  return table([row]);
}
function quovo$account$row(quovo$account) {
  return [
          quovo$account.id||"",
          quovo$account.username||"",
          quovo$account.user||"",
          quovo$account.brokerage_name||"",
          quovo$account.status||""
        ];
}
function quovo$brokerage$row(quovo$brokerage) {
  return [
    (quovo$brokerage&&quovo$brokerage.id)||"",
    (quovo$brokerage&&quovo$brokerage.name)||""];
}
function quovo$user$row(quovo$user) {
  return [
    (quovo$user&&quovo$user.id)||"",
    (quovo$user&&quovo$user.username)||""];
}
function choice$value(choice, index=0) {
  return choice.split(/  +/)[index];
}
function *cli$accounts(opts$ctx) {
  log(`${logPrefix}|cli$accounts`);
  yield cli$ctx.quovo$access_token$agent();
  yield cli$ctx.quovo$account$$_agent();
  cli$ctx.quovo$account$$ = cli$ctx.quovo$account$$;
  cli.log(
    table(
      array$concat$$(
        [["id", "username", "user", "brokerage_name", "status"]],
        cli$ctx.quovo$account$$.map(
          quovo$account =>
            quovo$account$row(quovo$account)))));
  return cli$ctx;
}
function *cli$cache$reset() {
  log(`${logPrefix}|cli$cache$reset`);
  delete cli$ctx.quovo$account$$;
  delete cli$ctx.quovo$user$$;
}
function *cli$reset() {
  log(`${logPrefix}|cli$reset`);
  return cli$ctx$reset();
}
function *cli$users(opts$ctx) {
  log(`${logPrefix}|cli$users`);
  yield cli$ctx.quovo$access_token$agent();
  yield cli$ctx.quovo$user$$agent();
  cli.log(
    table(
      array$concat$$(
        [["id", "username", "name", "email"]],
        cli$ctx.quovo$user$$.map(
          quovo$user => [
            quovo$user.id||"",
            quovo$user.username||"",
            quovo$user.name||"",
            quovo$user.email||""])
      )));
  return cli$ctx;
}
function cli$ctx$reset() {
  log(`${logPrefix}|cli$ctx$reset`);
  cli$ctx = {
    quovo$account$id: env.quovo$account$id__demo,
    quovo$brokerage$id: env.quovo$brokerage$id__demo,
    quovo$user$id: env.quovo$user$id__demo,
    quovo$username: env.quovo$username__demo
  };
  assign__agent$$(cli$ctx, {
    scope: ["quovo$access_token", "quovo$access_token$agent$expires"],
    key: "quovo$access_token$agent",
    agent$ttl: true,
    reset$fn: function *() {
      log(`${logPrefix}|cli$ctx$reset|quovo$access_token$agent|reset$fn`);
      return fn$quovo$access_token(...arguments);
    }
  }, {
    scope: ["quovo$account$$"],
    key: "quovo$account$$_agent",
    agent$ttl: true,
    reset$fn: function *() {
      log(`${logPrefix}|cli$ctx$reset|quovo$account$$_agent|reset$fn`);
      return yield quovo$account$$cmd(...arguments);
    }
  }, {
    scope: ["quovo$brokerage$$"],
    key: "quovo$brokerage$$agent",
    agent$ttl: true,
    reset$fn: function *() {
      log(`${logPrefix}|cli$ctx$reset|quovo$brokerage$$agent|reset$fn`);
      return yield quovo$brokerage$$post$cmd(...arguments)
    }
  }, {
    scope: ["quovo$user$$"],
    key: "quovo$user$$agent",
    agent$ttl: true,
    reset$fn: function *() {
      log(`${logPrefix}|cli$ctx$reset|quovo$user$$agent|reset$fn`);
      const ctx = yield quovo$user$$cmd(...arguments);
      return ctx;
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