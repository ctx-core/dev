import { Hono } from 'hono'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { hono__is } from './index.js'
/**
 * Tests for Hono instance duck-typing detection.
 * Verifies that the duck-typing check correctly identifies Hono instances
 * even when instanceof fails (cross-module class identity mismatch).
 */
test('hono__is: detects real Hono instance via instanceof', ()=>{
	equal(hono__is(new Hono()), true)
})
test('hono__is: detects duck-typed Hono-like object', ()=>{
	equal(hono__is({ fetch: ()=>{}, route: ()=>{} }), true)
})
test('hono__is: rejects null', ()=>{
	equal(hono__is(null), false)
})
test('hono__is: rejects undefined', ()=>{
	equal(hono__is(undefined), false)
})
test('hono__is: rejects plain function', ()=>{
	equal(hono__is(()=>{}), false)
})
test('hono__is: rejects object with only fetch', ()=>{
	equal(hono__is({ fetch: ()=>{} }), false)
})
test('hono__is: rejects object with only route', ()=>{
	equal(hono__is({ route: ()=>{} }), false)
})
test('hono__is: Hono instance has fetch and route methods', ()=>{
	const app = new Hono()
	equal(typeof app.fetch, 'function')
	equal(typeof app.route, 'function')
})
test.run()
