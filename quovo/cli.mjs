import {assign,clone} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import env from 'ctx-core/env'
import 'ctx-core/quovo/env'
import {ensure__agents} from 'ctx-core/agent/lib'
import {fetch__post__token} from 'ctx-core/quovo/fetch'
import {
  get__accounts__quovo,
  post__accounts__quovo,
  delete__account__quovo,
  post__sync__account__quovo,
  get__sync__account__user__quovo,
  get__challenges__account__quovo,
  put__challenges__account__quovo,
  post__brokerages__quovo,
  get__users__quovo
} from 'ctx-core/quovo/rpc'
import {timedout} from 'ctx-core/time/lib'
import Vorpal from 'vorpal'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import table from 'text-table'
import {log,debug} from 'ctx-core/logger/lib'
const cli = Vorpal()
    , logPrefix = 'ctx-core/quovo/cli'
let ctx__cli
inquirer.registerPrompt('autocomplete', autocomplete)
apply__command__cli()
ctx__reset__cli()
cli.delimiter('quovo/cli$').show()
function apply__command__cli() {
  cli.command('mfa', '{brokerage,user}: quovo mfa flow')
     .action(mfa__cli)
  cli.command('account [account]', '{account}: get/set quovo__account')
     .option('-s, --set')
     .option('-d, --delete')
     .action(account__cli)
  cli.command('account= [account]', '{account}: set quovo__account')
     .action(set__cli(account__cli))
  cli.command('account! [account]', '{account}: delete quovo__account')
     .action(delete__cli(account__cli))
  cli.command('brokerage [brokerage]', '{brokerage}: get/set brokerage__quovo')
     .option('-s, --set')
     .action(brokerage__cli)
  cli.command('brokerage= [brokerage]', '{brokerage}: set brokerage__quovo')
     .action(set__cli(brokerage__cli))
  cli.command('user [user]', '{user}: get/set user__quovoname')
     .option('-s, --set')
     .action(user__cli)
  cli.command('user= [user]', '{user}: set user__quovoname')
     .action(set__cli(user__cli))
  cli.command('accounts', '{accounts}: list accounts for user__quovoname')
     .action(accounts__cli)
  cli.command('reset cache', 'resets the cached quovo data')
     .action(reset__cache__cli)
  cli.command('reset all', 'resets this session data to the defaults')
     .action(reset__cli)
  cli.command('users', '{users}: list quovo users')
     .action(users__cli)
}
function set__cli(fn) {
  return function set__fn(opts) {
    opts.options.set = true
    return fn(opts)
  }
}
function delete__cli(fn) {
  return function delete__fn(opts) {
    opts.options.delete = true
    return fn(opts)
  }
}
async function mfa__cli() {
  log(`${logPrefix}|cli$mfa`)
  await ctx__cli.agent__access_token__quovo()
  await Promise.all(
    [ ctx__cli.agent__brokerages__quovo(),
      ctx__cli.agent__users__quovo()])
  const user__quovo = assign__user__quovo()
      , brokerage__quovo = find__brokerage__quovo()
      
  if (!(await prompt__confirm__new__account())) return ctx__cli
  assign(ctx__cli, {brokerage__quovo, user__quovo})
  assign(
    ctx__cli,
    {
      quovo__account: null,
      account_id__quovo: null})
  const username =
          await prompt__username__brokerage__quovo()
      , password =
          await prompt__password__brokerage__quovo()
  await post__accounts__quovo(ctx__cli, {
          data: JSON.stringify({
            user: ctx__cli.user_id__quovo,
            brokerage: ctx__cli.brokerage_id__quovo,
            username,
            password
          })
        })
  try {
    await quovo__account__challenge()
    await get__sync__account__user__quovo(ctx__cli)
    cli.log(`account_id__quovo: ${ctx__cli.account_id__quovo}`)
    log__account__user__quovo__sync__cli(ctx__cli)
    cli.log(`TODO: mfa|${row__table(row__user__quovo(assign__user__quovo()))}`)
  } finally {
    if (await prompt__confirm__del__account()) {
      await delete__account__quovo(ctx__cli)
    }
  }
  return ctx__cli
  function log__account__user__quovo__sync__cli() {
    cli.log(`${logPrefix}|log__account__user__quovo__sync__cli`, JSON.stringify({sync: ctx__cli.quovo__account__sync}, null, 2))
  }
  function prompt__confirm__new__account() {
    const username = user__quovo.username
        , brokerage_name = brokerage__quovo.name
    if (!username) {
      cli.log('user does not exist')
      return false
    }
    if (!brokerage_name) {
      cli.log('brokerage does not exist')
      return false
    }
    return prompt({
      type: 'confirm',
      message: `new account for ${JSON.stringify({username, brokerage_name})}`
    })
  }
  async function prompt__username__brokerage__quovo() {
    const name__brokerage__quovo = brokerage__quovo.name
    if (!name__brokerage__quovo) {
      cli.log('brokerage does not exist')
      return false
    }
    return prompt({
      type: 'input',
      message: `brokerage ${name__brokerage__quovo} username`
    })
  }
  function prompt__password__brokerage__quovo() {
    const name__brokerage__quovo = brokerage__quovo.name
    if (!name__brokerage__quovo) {
      cli.log('brokerage does not exist')
      return false
    }
    return prompt({
      type: 'password',
      message: `brokerage ${name__brokerage__quovo} password`
    })
  }
  function prompt__confirm__del__account() {
    const quovo__account = ctx__cli.quovo__account
    if (!quovo__account) {
      cli.log(`account ${ctx__cli.account_id__quovo} does not exist`)
      return false
    }
    return prompt({
      type: 'confirm',
      message: `delete created account ${row__table($row__quovo__account(quovo__account))}`
    })
  }
  async function quovo__account__challenge() {
    while(true) {
      await post__sync__account__quovo(ctx__cli)
      await waitFor__account__user__quovo__sync()
      await get__challenges__account__quovo(ctx__cli)
      const quovo__account__challenge__unanswered =
              (ctx__cli.quovo__account__challenges || [])
                .find(
                  quovo__account__challenge =>
                    !quovo__account__challenge.is_answered)
      if (!quovo__account__challenge__unanswered) break
      const { question
            , choices
            } = quovo__account__challenge__unanswered
      let answer
      if (choices) {
        const choice$row$$ = choices.map(
                (choice, i) =>
                  [i, choice.category, choice.value])
            , choice = await prompt({
                type: 'autocomplete',
                message: question,
                source: autocomplete__source(choice$row$$)
              })
        answer = choice__value(choice)
      } else {
        answer = await prompt({
          type: 'input',
          message: question,
          source: autocomplete__source(choice$row$$)
        })
      }
      await put__challenges__account__quovo(ctx__cli, {
        question,
        answer})
      if (quovo__account__challenge__unanswered.type == 'realtime') break
    }
  }
  async function waitFor__account__user__quovo__sync() {
    const start = new Date()
    while (
      !ctx__cli
      || !ctx__cli.quovo__account__sync
      || ctx__cli.quovo__account__sync.progress
      || !timedout(start, 10000)
    ) {
      await get__sync__account__user__quovo(ctx__cli)
      log__account__user__quovo__sync__cli(ctx__cli)
    }
    return ctx__cli
  }
}
async function account__cli(opts) {
  log(`${logPrefix}|cli$account`)
  await assign__account__cli__ctx__cli(opts)
  if (!opts.options.delete) {
    cli.log(
      ctx__cli.quovo__account
        ? row__table($row__quovo__account(ctx__cli.quovo__account))
        : 'no account: use `account=` to select a quovo__account')
  }
  return ctx__cli
}
async function assign__account__cli__ctx__cli(opts) {
  log(`${logPrefix}|assign__account__cli__ctx__cli`)
  await ctx__cli.agent__access_token__quovo()
  await ctx__cli.agent__accounts__quovo()
  if (!ctx__cli.quovo__account) refresh__quovo__account()
  const {accounts__quovo} = ctx__cli
      , set__options = opts.options.set
      , delete__options = opts.options.delete
  if (set__options || delete__options) {
    let account_id__quovo = parseInt(opts.account)
    if (!account_id__quovo) {
      const account$choice =
        await prompt__autocomplete$account()
      account_id__quovo =
        parseInt(choice__value(account$choice)||0)
      if (!account_id__quovo)
        return ctx__cli
    }
    assign(ctx__cli, {account_id__quovo})
  }
  refresh__quovo__account()
  if (delete__options) {
    if (await prompt__confirm$delete())
      await delete__account__quovo({})
  }
  return ctx__cli
  function refresh__quovo__account() {
    ctx__cli.quovo__account =
      find__quovo__account()
  }
  function prompt__autocomplete$account() {
    const $row__quovo__accounts = account$table().split('\n')
    find__quovo__account()
    const {quovo__account} = ctx__cli
    let message = 'select an account:'
    if (quovo__account) {
      message = `${message} current(${row__table($row__quovo__account(quovo__account))})`
    }
    return prompt({
      type: 'autocomplete',
      message,
      source:
        autocomplete__source(
          $row__quovo__accounts,
          slice__50)
    })
  }
  function account$table() {
    return table(
      concat__array(
        [['0', '(cancel)', '']],
        accounts__quovo.map(
          quovo__account =>
            $row__quovo__account(
              quovo__account))))
  }
  function prompt__confirm$delete() {
    const quovo__account = ctx__cli.quovo__account
    if (!quovo__account) {
      cli.log(`account ${ctx__cli.account_id__quovo} does not exist`)
      return false
    }
    return prompt({
      type: 'confirm',
      default: false,
      message: `delete ${row__table($row__quovo__account(quovo__account))}`
    })
  }
}
function find__quovo__account() {
  return ctx__cli.accounts__quovo.find(
    quovo__account =>
      quovo__account.id == ctx__cli.account_id__quovo)
}
async function brokerage__cli(opts) {
  log(`${logPrefix}|cli$brokerage`)
  await assign__brokerage__ctx__cli(opts)
  const {brokerage__quovo} = ctx__cli
  cli.log(brokerage__quovo
    ? row__table(row__brokerage__quovo(brokerage__quovo))
    : 'no brokerage: use `brokerage=` to select a brokerage__quovo')
  return ctx__cli
}
async function assign__brokerage__ctx__cli(ctx) {
  await ctx__cli.agent__access_token__quovo()
  await ctx__cli.agent__brokerages__quovo()
  if (!ctx__cli.brokerage__quovo) refresh__brokerage__quovo()
  const {brokerages__quovo} = ctx
  if (ctx.options.set) {
    let brokerage_id__quovo = parseInt(ctx.brokerage)
    if (!brokerage_id__quovo) {
      const brokerage$choice = await prompt__autocomplete__brokerage()
      brokerage_id__quovo =
        parseInt(
          choice__value(brokerage$choice)
          ||0)
      if (!brokerage_id__quovo) return ctx__cli
    }
    assign(ctx__cli, {brokerage_id__quovo})
  }
  refresh__brokerage__quovo()
  return ctx__cli
  function refresh__brokerage__quovo() {
    ctx__cli.brokerage__quovo = find__brokerage__quovo()
  }
  function prompt__autocomplete__brokerage() {
    const brokerage__quovo$rows = brokerage$table().split('\n')
    return prompt([{
      type: 'autocomplete',
      message: `select a brokerage: current(${
        row__table(row__brokerage__quovo(find__brokerage__quovo()))
      })`,
      source: autocomplete__source(brokerage__quovo$rows, slice__50)
    }])
  }
  function brokerage$table() {
    return table(
      concat__array(
        [['0', '(cancel)']],
        brokerages__quovo.map(brokerage__quovo =>
          row__brokerage__quovo(brokerage__quovo))
      ))
  }
}
function find__brokerage__quovo() {
  return ctx__cli.
    brokerages__quovo.
    find(
      brokerage__quovo =>
        brokerage__quovo.id == ctx__cli.brokerage_id__quovo)
}
async function user__cli(opts) {
  log(`${logPrefix}|cli$user`)
  await assign__user__ctx__cli(opts)
  cli.log(ctx__cli.user__quovo ?
    row__table(
      row__user__quovo(ctx__cli.user__quovo)) :
    'no user: use `user=` to select a user__quovo')
  return ctx__cli
}
async function assign__user__ctx__cli(opts) {
  log(`${logPrefix}|assign__cli$user__cli$ctx`)
  await ctx__cli.agent__access_token__quovo()
  await ctx__cli.agent__users__quovo()
  if (!ctx__cli.user__quovo) refresh__user__quovo()
  const ctx = assign(opts)
      , {users__quovo} = ctx
  let {user__quovoname} = opts
  if (!user__quovoname) {
    const choice__user =
            await prompt__autocomplete__user()
        , user_id__quovo = parseInt(choice__value(choice__user)||0)
    if (!user_id__quovo) return ctx__cli
    assign(ctx__cli, {
      user_id__quovo,
      user__quovoname: choice__value(choice__user, 1)})
  }
  ctx__cli.user__quovoname = user__quovoname
  refresh__user__quovo()
  return ctx__cli
  function refresh__user__quovo() {
    ctx__cli.user__quovo = assign__user__quovo()
  }
  async function prompt__autocomplete__user() {
    const row__user__quovos = user$table().split('\n')
    assign__user__quovo()
    const user__quovoname = ctx__cli.user__quovoname
    let message = 'select a user:'
    if (user__quovoname) {
      message = `${message} current(${
        row__table(row__user__quovo(user__quovoname))
      })`
    }
    return prompt({
      type: 'autocomplete',
      message: message,
      source: autocomplete__source(row__user__quovos, slice__50)
    })
  }
  function user$table() {
    return table(
      concat__array(
        [['0', '(cancel)']],
        users__quovo.map(user__quovo => row__user__quovo(user__quovo))
      ))
  }
}
function autocomplete__source(rows, filter=v=>v) {
  return (choices, input) =>
    new Promise(resolve =>
      resolve(
        filter(
          filter__autocomplete__row(rows, input))))
}
function filter__autocomplete__row(rows, input) {
  return rows.filter(
    row =>
      new RegExp(input || '.', 'i').exec(row)
      !== null
  )
}
function slice__50(rows) {
  return rows.slice(0,50)
}
function assign__user__quovo() {
  return ctx__cli.users__quovo.find(
    user__quovo =>
      user__quovo.username
      == ctx__cli.user__quovoname)
}
function row__table(row) {
  return table([row])
}
function $row__quovo__account(quovo__account) {
  return [
          quovo__account.id||'',
          quovo__account.username||'',
          quovo__account.user||'',
          quovo__account.brokerage_name||'',
          quovo__account.status||''
        ]
}
function row__brokerage__quovo(brokerage__quovo) {
  return [
    (brokerage__quovo && brokerage__quovo.id)
    ||'',
    (brokerage__quovo && brokerage__quovo.name)
    ||''
  ]
}
function row__user__quovo(user__quovo) {
  return [
    (user__quovo && user__quovo.id)
    ||'',
    (user__quovo && user__quovo.username)
    ||''
  ]
}
function choice__value(choice, index=0) {
  return choice.split(/  +/)[index]
}
async function accounts__cli(opts$ctx) {
  log(`${logPrefix}|cli$accounts`)
  await ctx__cli.agent__access_token__quovo()
  await ctx__cli.agent__accounts__quovo()
  cli.log(
    table(
      concat__array(
        [['id', 'username', 'user', 'brokerage_name', 'status']],
        ctx__cli.accounts__quovo.map(
          quovo__account =>
            $row__quovo__account(quovo__account)))))
  return ctx__cli
}
function reset__cache__cli() {
  log(`${logPrefix}|cli$cache$reset`)
  ctx__cli.accounts__quovo = null
  ctx__cli.users__quovo = null
}
function reset__cli() {
  log(`${logPrefix}|cli$reset`)
  return ctx__reset__cli()
}
async function users__cli(ctx__opts) {
  log(`${logPrefix}|cli$users`)
  await ctx__cli.agent__access_token__quovo()
  await ctx__cli.agent__users__quovo()
  cli.log(
    table(
      concat__array(
        [['id', 'username', 'name', 'email']],
        ctx__cli.users__quovo.map(
          user__quovo => [
            user__quovo.id||'',
            user__quovo.username||'',
            user__quovo.name||'',
            user__quovo.email||''])
      )))
  return ctx__cli
}
function ctx__reset__cli() {
  log(`${logPrefix}|reset__cli$ctx`)
  ctx__cli = {
    account_id__quovo: env.QUOVO_ACCOUNT_ID_DEMO,
    brokerage_id__quovo: env.QUOVO_BROKERAGE_ID_DEMO,
    user_id__quovo: env.QUOVO_USER_ID_DEMO,
    user__quovoname: env.QUOVO_USERNAME_DEMO
  }
  ensure__agents(ctx__cli, {
    scope: ['access_token__quovo', 'expires__access_token__quovo'],
    key: 'agent__access_token__quovo',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|agent__access_token__quovo|reset`)
      return fetch__post__token(ctx__cli)
    }
  }, {
    scope: ['accounts__quovo'],
    key: 'agent__accounts__quovo',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|agent__accounts__quovo|reset`)
      return get__accounts__quovo(ctx__cli)
    }
  }, {
    scope: ['brokerages__quovo'],
    key: 'agent__brokerages__quovo',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|agent__brokerages__quovo|reset`)
      return post__brokerages__quovo(ctx__cli)
    }
  }, {
    scope: ['users__quovo'],
    key: 'agent__users__quovo',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|agent__users__quovo|reset`)
      return get__users__quovo(ctx__cli)
    }
  })
  return ctx__cli
}
function prompt(ctx, cb) {
  return new Promise(resolve => {
    return inquirer.prompt(
      clone({name: 'value'}, ctx),
      cb||(answer => resolve(answer.value)))
  })
}