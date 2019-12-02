const fs = require('fs')
import { Request } from 'polka'
import { writable } from 'svelte/store'
// const template = require('./template.html')
const template = fs.readFileSync(`src/template.html`).toString()
let App__amp
(async ()=>{
	// @ts-ignore
	App__amp = (await import('@ctx-core/sapper-amp/App__amp.svelte')).default
})()
export type Opts__render = {
	req:Request
	component:any,
}
export type Opts__fn__html__amp = {
	Layout
	Error
	CONTEXT_KEY
}
export function _fn__html__amp(opts:Opts__fn__html__amp) {
	const {
		Layout,
		Error,
		CONTEXT_KEY,
	} = opts
	return function _html__amp(
		{
			req,
			component,
		}:Opts__render
	) {
		const { params, session } = req
		const stores = {
			page: {
				subscribe: writable({
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params
				}).subscribe
			},
			preloading: {
				subscribe: writable(null).subscribe
			},
			session: writable(session)
		}
		const { html, head, css } = App__amp.render({
			stores,
			component,
			CONTEXT_KEY,
			Layout,
			Error
		})
		return (
			template
				.replace('%sapper.base%', ()=>`<base href="${req.originalUrl}/">`)
				.replace('%sapper.scripts%', ()=>'')
				.replace('%sapper.html%', ()=>html)
				.replace('%sapper.head%', ()=>head)
				.replace('%sapper.styles%', ()=>
					`<style type="text/css">${css?.code || ''}</style>`)
		)
	}
}
