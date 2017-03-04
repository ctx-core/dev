import {assign,clone} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import env from 'ctx-core/env'
import 'ctx-core/quovo/env'
import {ensure__agents} from 'ctx-core/agent/lib'
import {fetch$post__token} from 'ctx-core/quovo/fetch'
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
let cli$ctx
inquirer.registerPrompt('autocomplete', autocomplete)
apply__cli$command()
reset__cli$ctx()
cli.delimiter('quovo/cli$').show()
function apply__cli$command() {
  cli.command('mfa', '{brokerage,user}: quovo mfa flow')
     .action(cli$mfa)
  cli.command('account [account]', '{account}: get/set quovo__account')
     .option('-s, --set')
     .option('-d, --delete')
     .action(cli$account)
  cli.command('account= [account]', '{account}: set quovo__account')
     .action(cli$set(cli$account))
  cli.command('account! [account]', '{account}: delete quovo__account')
     .action(cli$delete(cli$account))
  cli.command('brokerage [brokerage]', '{brokerage}: get/set brokerage__quovo')
     .option('-s, --set')
     .action(cli$brokerage)
  cli.command('brokerage= [brokerage]', '{brokerage}: set brokerage__quovo')
     .action(cli$set(cli$brokerage))
  cli.command('user [user]', '{user}: get/set user__quovoname')
     .option('-s, --set')
     .action(cli$user)
  cli.command('user= [user]', '{user}: set user__quovoname')
     .action(cli$set(cli$user))
  cli.command('accounts', '{accounts}: list accounts for user__quovoname')
     .action(cli$accounts)
  cli.command('reset cache', 'resets the cached quovo data')
     .action(cli$cache$reset)
  cli.command('reset all', 'resets this session data to the defaults')
     .action(cli$reset)
  cli.command('users', '{users}: list quovo users')
     .action(cli$users)
}
function cli$set(fn) {
  return function set__fn(opts$ctx) {
    opts$ctx.options.set = true
    return fn(opts$ctx)
  }
}
function cli$delete(fn) {
  return function delete__fn(opts$ctx) {
    opts$ctx.options.delete = true
    return fn(opts$ctx)
  }
}
async function cli$mfa() {
  log(`${logPrefix}|cli$mfa`)
  await cli$ctx.quovo__access_token__agent()
  await [cli$ctx.brokerages__quovo__agent(), cli$ctx.users__quovo__agent()]
  const user__quovo = assign__user__quovo()
      , brokerage__quovo = find__brokerage__quovo()
      
  if (!(await prompt__confirm__new__account())) return cli$ctx
  assign(cli$ctx, {brokerage__quovo, user__quovo})
  assign(cli$ctx, {quovo__account: null, account_id__quovo: null})
  const username = await prompt__username__brokerage__quovo()
  const password = await prompt__password__brokerage__quovo()
  await post__accounts__quovo(cli$ctx, {
          data: JSON.stringify({
            user: cli$ctx.user_id__quovo,
            brokerage: cli$ctx.brokerage_id__quovo,
            username,
            password
          })
        })
  try {
    await quovo__account__challenge()
    await get__sync__account__user__quovo(cli$ctx)
    cli.log(`account_id__quovo: ${cli$ctx.account_id__quovo}`)
    cli$log__account__user__quovo__sync(cli$ctx)
    cli.log(`TODO: mfa|${row__table(row__user__quovo(assign__user__quovo()))}`)
  } finally {
    if (await prompt__confirm__del__account()) {
      await delete__account__quovo(cli$ctx)
    }
  }
  return cli$ctx
  function cli$log__account__user__quovo__sync() {
    cli.log(`${logPrefix}|cli$log__account__user__quovo__sync`, JSON.stringify({sync: cli$ctx.quovo__account__sync}, null, 2))
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
    const quovo__account = cli$ctx.quovo__account
    if (!quovo__account) {
      cli.log(`account ${cli$ctx.account_id__quovo} does not exist`)
      return false
    }
    return prompt({
      type: 'confirm',
      message: `delete created account ${row__table(quovo__account$row(quovo__account))}`
    })
  }
  async function quovo__account__challenge() {
    while(true) {
      await post__sync__account__quovo(cli$ctx)
      await waitFor__account__user__quovo__sync()
      await get__challenges__account__quovo(cli$ctx)
      const quovo__account__challenge__unanswered =
              (cli$ctx.quovo__account__challenges || [])
                .find(
                  quovo__account__challenge => !quovo__account__challenge.is_answered)
      if (!quovo__account__challenge__unanswered) break
      const {question, choices} = quovo__account__challenge__unanswered
      let answer
      if (choices) {
        const choice$row$$ = choices.map(
                (choice, i) => [i, choice.category, choice.value])
        const choice = await prompt({
                type: 'autocomplete',
                message: question,
                source: autocomplete$source(choice$row$$)
              })
        answer = choice$value(choice)
      } else {
        answer = await prompt({
          type: 'input',
          message: question,
          source: autocomplete$source(choice$row$$)
        })
      }
      await put__challenges__account__quovo(cli$ctx, {
        question,
        answer})
      if (quovo__account__challenge__unanswered.type == 'realtime') break
    }
  }
  async function waitFor__account__user__quovo__sync() {
    const start = new Date()
    while (
      !cli$ctx
      || !cli$ctx.quovo__account__sync
      || cli$ctx.quovo__account__sync.progress
      || !timedout(start, 10000)
    ) {
      await get__sync__account__user__quovo(cli$ctx)
      cli$log__account__user__quovo__sync(cli$ctx)
    }
    return cli$ctx
  }
}
async function cli$account(opts$ctx) {
  log(`${logPrefix}|cli$account`)
  await assign__cli$account__cli$ctx(opts$ctx)
  if (!opts$ctx.options.delete) {
    cli.log(
      cli$ctx.quovo__account
        ? row__table(quovo__account$row(cli$ctx.quovo__account))
        : 'no account: use `account=` to select a quovo__account')
  }
  return cli$ctx
}
async function assign__cli$account__cli$ctx(opts$ctx) {
  log(`${logPrefix}|assign__cli$account__cli$ctx`)
  await cli$ctx.quovo__access_token__agent()
  await cli$ctx.accounts__quovo__agent()
  if (!cli$ctx.quovo__account) refresh__quovo__account()
  const {accounts__quovo} = cli$ctx
      , options$set = opts$ctx.options.set
      , options$delete = opts$ctx.options.delete
  if (options$set || options$delete) {
    let account_id__quovo = parseInt(opts$ctx.account)
    if (!account_id__quovo) {
      const account$choice = await prompt__autocomplete$account()
      account_id__quovo = parseInt(choice$value(account$choice)||0)
      if (!account_id__quovo) return cli$ctx
    }
    assign(cli$ctx, {account_id__quovo})
  }
  refresh__quovo__account()
  if (options$delete) {
    if (await prompt__confirm$delete()) await delete__account__quovo({})
  }
  return cli$ctx
  function refresh__quovo__account() {
    cli$ctx.quovo__account = find__quovo__account()
  }
  function prompt__autocomplete$account() {
    const quovo__account$rows = account$table().split('\n')
    find__quovo__account()
    const {quovo__account} = cli$ctx
    let message = 'select an account:'
    if (quovo__account) {
      message = `${message} current(${row__table(quovo__account$row(quovo__account))})`
    }
    return prompt({
      type: 'autocomplete',
      message,
      source: autocomplete$source(quovo__account$rows, array$slice$50)
    })
  }
  function account$table() {
    return table(
      concat__array(
        [['0', '(cancel)', '']],
        accounts__quovo.map(quovo__account => quovo__account$row(quovo__account))))
  }
  function prompt__confirm$delete() {
    const quovo__account = cli$ctx.quovo__account
    if (!quovo__account) {
      cli.log(`account ${cli$ctx.account_id__quovo} does not exist`)
      return false
    }
    return prompt({
      type: 'confirm',
      default: false,
      message: `delete ${row__table(quovo__account$row(quovo__account))}`
    })
  }
}
function find__quovo__account() {
  return cli$ctx.accounts__quovo.find(
    quovo__account =>
      quovo__account.id == cli$ctx.account_id__quovo)
}
async function cli$brokerage(opts$ctx) {
  log(`${logPrefix}|cli$brokerage`)
  await assign__brokerage$cli__cli$ctx(opts$ctx)
  const {brokerage__quovo} = cli$ctx
  cli.log(brokerage__quovo
    ? row__table(brokerage__quovo$row(brokerage__quovo))
    : 'no brokerage: use `brokerage=` to select a brokerage__quovo')
  return cli$ctx
}
async function assign__brokerage$cli__cli$ctx(ctx) {
  await cli$ctx.quovo__access_token__agent()
  await cli$ctx.brokerages__quovo__agent()
  if (!cli$ctx.brokerage__quovo) refresh__brokerage__quovo()
  const {brokerages__quovo} = ctx
  if (ctx.options.set) {
    let brokerage_id__quovo = parseInt(ctx.brokerage)
    if (!brokerage_id__quovo) {
      const brokerage$choice = await prompt__autocomplete$brokerage()
      brokerage_id__quovo = parseInt(choice$value(brokerage$choice)||0)
      if (!brokerage_id__quovo) return cli$ctx
    }
    assign(cli$ctx, {brokerage_id__quovo})
  }
  refresh__brokerage__quovo()
  return cli$ctx
  function refresh__brokerage__quovo() {
    cli$ctx.brokerage__quovo = find__brokerage__quovo()
  }
  function prompt__autocomplete$brokerage() {
    const brokerage__quovo$rows = brokerage$table().split('\n')
    return prompt([{
      type: 'autocomplete',
      message: `select a brokerage: current(${row__table(brokerage__quovo$row(find__brokerage__quovo()))})`,
      source: autocomplete$source(brokerage__quovo$rows, array$slice$50)
    }])
  }
  function brokerage$table() {
    return table(
      concat__array(
        [['0', '(cancel)']],
        brokerages__quovo.map(brokerage__quovo => brokerage__quovo$row(brokerage__quovo))
      ))
  }
}
function find__brokerage__quovo() {
  return cli$ctx.
    brokerages__quovo.
    find(
      brokerage__quovo =>
        brokerage__quovo.id == cli$ctx.brokerage_id__quovo)
}
async function cli$user(opts$ctx) {
  log(`${logPrefix}|cli$user`)
  await assign__cli$user__cli$ctx(opts$ctx)
  cli.log(cli$ctx.user__quovo ?
    row__table(
      row__user__quovo(cli$ctx.user__quovo)) :
    'no user: use `user=` to select a user__quovo')
  return cli$ctx
}
async function assign__cli$user__cli$ctx(opts$ctx) {
  log(`${logPrefix}|assign__cli$user__cli$ctx`)
  await cli$ctx.quovo__access_token__agent()
  await cli$ctx.users__quovo__agent()
  if (!cli$ctx.user__quovo) refresh__user__quovo()
  const ctx = assign(opts$ctx)
      , {users__quovo} = ctx
  let {user__quovoname} = opts$ctx
  if (!user__quovoname) {
    const user$choice = await prompt__autocomplete$user()
        , user_id__quovo = parseInt(choice$value(user$choice)||0)
    if (!user_id__quovo) return cli$ctx
    assign(cli$ctx, {
      user_id__quovo,
      user__quovoname: choice$value(user$choice, 1)})
  }
  cli$ctx.user__quovoname = user__quovoname
  refresh__user__quovo()
  return cli$ctx
  function refresh__user__quovo() {
    cli$ctx.user__quovo = assign__user__quovo()
  }
  async function prompt__autocomplete$user() {
    const row__user__quovos = user$table().split('\n')
    assign__user__quovo()
    const user__quovoname = cli$ctx.user__quovoname
    let message = 'select a user:'
    if (user__quovoname) {
      message = `${message} current(${row__table(row__user__quovo(user__quovoname))})`
    }
    return prompt({
      type: 'autocomplete',
      message: message,
      source: autocomplete$source(row__user__quovos, array$slice$50)
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
function autocomplete$source(rows, filter=v=>v) {
  return (choices, input) =>
    new Promise(resolve =>
      resolve(
        filter(autocomplete$row$$filter$$(rows, input))))
}
function autocomplete$row$$filter$$(rows, input) {
  return rows.filter(
    row => new RegExp(input || '.', 'i').exec(row) !== null
  )
}
function array$slice$50(rows) {
  return rows.slice(0,50)
}
function assign__user__quovo() {
  return cli$ctx.users__quovo.find(
    user__quovo =>
      user__quovo.username == cli$ctx.user__quovoname)
}
function row__table(row) {
  return table([row])
}
function quovo__account$row(quovo__account) {
  return [
          quovo__account.id||'',
          quovo__account.username||'',
          quovo__account.user||'',
          quovo__account.brokerage_name||'',
          quovo__account.status||''
        ]
}
function brokerage__quovo$row(brokerage__quovo) {
  return [
    (brokerage__quovo&&brokerage__quovo.id)||'',
    (brokerage__quovo&&brokerage__quovo.name)||'']
}
function row__user__quovo(user__quovo) {
  return [
    (user__quovo&&user__quovo.id)||'',
    (user__quovo&&user__quovo.username)||'']
}
function choice$value(choice, index=0) {
  return choice.split(/  +/)[index]
}
async function cli$accounts(opts$ctx) {
  log(`${logPrefix}|cli$accounts`)
  await cli$ctx.quovo__access_token__agent()
  await cli$ctx.accounts__quovo__agent()
  cli.log(
    table(
      concat__array(
        [['id', 'username', 'user', 'brokerage_name', 'status']],
        cli$ctx.accounts__quovo.map(
          quovo__account =>
            quovo__account$row(quovo__account)))))
  return cli$ctx
}
function cli$cache$reset() {
  log(`${logPrefix}|cli$cache$reset`)
  cli$ctx.accounts__quovo = null
  cli$ctx.users__quovo = null
}
function cli$reset() {
  log(`${logPrefix}|cli$reset`)
  return reset__cli$ctx()
}
async function cli$users(opts$ctx) {
  log(`${logPrefix}|cli$users`)
  await cli$ctx.quovo__access_token__agent()
  await cli$ctx.users__quovo__agent()
  cli.log(
    table(
      concat__array(
        [['id', 'username', 'name', 'email']],
        cli$ctx.users__quovo.map(
          user__quovo => [
            user__quovo.id||'',
            user__quovo.username||'',
            user__quovo.name||'',
            user__quovo.email||''])
      )))
  return cli$ctx
}
function reset__cli$ctx() {
  log(`${logPrefix}|reset__cli$ctx`)
  cli$ctx = {
    account_id__quovo: env.QUOVO_ACCOUNT_ID_DEMO,
    brokerage_id__quovo: env.QUOVO_BROKERAGE_ID_DEMO,
    user_id__quovo: env.QUOVO_USER_ID_DEMO,
    user__quovoname: env.QUOVO_USERNAME_DEMO
  }
  ensure__agents(cli$ctx, {
    scope: ['quovo__access_token', 'quovo__access_token__expires'],
    key: 'quovo__access_token__agent',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|quovo__access_token__agent|reset`)
      return fetch$post__token(cli$ctx)
    }
  }, {
    scope: ['accounts__quovo'],
    key: 'accounts__quovo__agent',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|accounts__quovo__agent|reset`)
      return get__accounts__quovo(cli$ctx)
    }
  }, {
    scope: ['brokerages__quovo'],
    key: 'brokerages__quovo__agent',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|brokerages__quovo__agent|reset`)
      return post__brokerages__quovo(cli$ctx)
    }
  }, {
    scope: ['users__quovo'],
    key: 'users__quovo__agent',
    ttl: true,
    reset: async () => {
      log(`${logPrefix}|reset__cli$ctx|users__quovo__agent|reset`)
      return get__users__quovo(cli$ctx)
    }
  })
  return cli$ctx
}
function prompt(ctx, cb) {
  return new Promise(resolve => {
    return inquirer.prompt(
      clone({name: 'value'}, ctx),
      cb||(answer => resolve(answer.value)))
  })
}