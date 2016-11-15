import {assign,clone} from 'ctx-core/object/lib'
import {registerElement} from 'ctx-core/dom/lib'
import {closest} from 'ctx-core/dom/lib'
import parseUri from 'parseUri'
import {navigate} from 'ctx-core/route/lib'
import {log,fn$console,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/tag/lib'
export function tag__assign(tag, ...tag_overrides$$) {
  log(`${logPrefix}|tag__assign`, tag)
  let {opts} = tag
    , {ctx} = opts
  const tag_overrides = clone(...tag_overrides$$)
      , registerElement__tag_overrides =
          tag_overrides.registerElement || []
  tag_overrides.registerElement = [].concat(...registerElement__tag_overrides)
  tag_overrides.registerElement.push(tag.root.tagName)
  assign(tag, {
    ctx,
    update__ctx: update__ctx.bind(tag),
    schedule__update__ctx: schedule__update__ctx.bind(tag),
    onclick__navigate: $onclick__nagivate(ctx).bind(tag),
    onclick__outbound: $onclick__outbound(ctx).bind(tag)
  }, tag_overrides)
  for (let i=0; i < tag_overrides.registerElement.length; i++) {
    const element = tag_overrides.registerElement[i]
    registerElement(ctx, element)
  }
  return tag
}
export function $onclick__outbound(ctx) {
  const {tag$name='a',
        href$key='href'} = ctx
  return (e) => {
    log(`${logPrefix}|onclick__outbound`)
    e.preventDefault()
    const dom$a = closest(e.target, tag$name, true)
    window.location.href = dom$a[href$key]
  }
}
export function $onclick__nagivate(ctx) {
  const tag$name = ctx.tag$name || 'a'
      , href$key = ctx.href$key || 'href'
  return (e) => {
    const $a = closest(e.target, tag$name, true)
    log(`${logPrefix}|onclick__navigate`)
    if (e.preventDefault) e.preventDefault()
    const link$uri = parseUri($a[href$key])
        , link$uri$query = link$uri.query
        , {path} = link$uri
        , query =
            link$uri$query
            ? `?${link$uri$query}`
            : ''
    navigate(ctx, `${path}${query}`)
    return false
  }
}
export function schedule__update__ctx(timeout=0) {
  log(`${logPrefix}|schedule__update__ctx`)
  const tag = this
  setTimeout(
    fn$console(
      () => tag.update__ctx(),
      {info: `${logPrefix}|schedule__update__ctx|setTimeout`}),
    timeout)
}
export function $update__ctx($ctx={}) {
  log(`${logPrefix}|$update__ctx`)
  return function update() {
    log(`${logPrefix}|$update__ctx|update`, this.root)
    const tag = this
    let ctx = assign(tag.ctx, ...arguments)
    assign(tag, {ctx})
    if ($ctx.before) $ctx.before.call(tag, ctx)
    tag.update()
    if ($ctx.after) $ctx.after.call(tag, ctx)
  }
}
export const update__ctx = $update__ctx()