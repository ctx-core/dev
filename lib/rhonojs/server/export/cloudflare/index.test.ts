import { test } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { worker_entry__generate_, wrangler_toml__generate_ } from './index.js'
test('worker_entry__generate_|single route', ()=>{
	const source = worker_entry__generate_([
		{ pattern: '/api/*', handler: './handlers/api.js' }
	])
	ok(source.includes("import handler_0 from '"))
	ok(source.includes("url.pathname.startsWith('/api')"))
	ok(source.includes('env.ASSETS.fetch(request)'))
})
test('worker_entry__generate_|exact route', ()=>{
	const source = worker_entry__generate_([
		{ pattern: '/health', handler: './handlers/health.js' }
	])
	ok(source.includes("url.pathname === '/health'"))
})
test('worker_entry__generate_|multiple routes', ()=>{
	const source = worker_entry__generate_([
		{ pattern: '/api/*', handler: './handlers/api.js' },
		{ pattern: '/health', handler: './handlers/health.js' }
	])
	ok(source.includes('handler_0'))
	ok(source.includes('handler_1'))
})
test('wrangler_toml__generate_|defaults', ()=>{
	const toml = wrangler_toml__generate_({})
	ok(toml.includes('name = "app"'))
	ok(toml.includes('compatibility_date'))
	ok(toml.includes('pages_build_output_dir = "dist/browser"'))
})
test('wrangler_toml__generate_|custom name', ()=>{
	const toml = wrangler_toml__generate_({ name: 'my-app' })
	ok(toml.includes('name = "my-app"'))
})
test('wrangler_toml__generate_|custom out_dir', ()=>{
	const toml = wrangler_toml__generate_({}, 'build/output')
	ok(toml.includes('pages_build_output_dir = "build/output"'))
})
test('wrangler_toml__generate_|vars', ()=>{
	const toml = wrangler_toml__generate_({
		vars: { API_KEY: 'test123' }
	})
	ok(toml.includes('[vars]'))
	ok(toml.includes('API_KEY = "test123"'))
})
test('wrangler_toml__generate_|routes', ()=>{
	const toml = wrangler_toml__generate_({
		routes: [{ pattern: 'example.com/*', zone_name: 'example.com' }]
	})
	ok(toml.includes('[[routes]]'))
	ok(toml.includes('pattern = "example.com/*"'))
	ok(toml.includes('zone_name = "example.com"'))
})
test.run()
