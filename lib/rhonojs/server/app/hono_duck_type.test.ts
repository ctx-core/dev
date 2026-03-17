import { describe, test, expect } from 'bun:test'
import { Hono } from 'hono'
/**
 * Tests for Hono instance duck-typing detection.
 * Verifies that the duck-typing check correctly identifies Hono instances
 * even when instanceof fails (cross-module class identity mismatch).
 */
function is_hono_instance(middleware:unknown):boolean {
	return middleware instanceof Hono
		|| (middleware != null
			&& typeof (middleware as any).fetch === 'function'
			&& typeof (middleware as any).route === 'function')
}
describe('Hono duck-typing', ()=>{
	test('detects real Hono instance via instanceof', ()=>{
		const app = new Hono()
		expect(is_hono_instance(app)).toBe(true)
	})
	test('detects duck-typed Hono-like object', ()=>{
		const fake_hono = {
			fetch: ()=>{},
			route: ()=>{},
		}
		expect(is_hono_instance(fake_hono)).toBe(true)
	})
	test('rejects null', ()=>{
		expect(is_hono_instance(null)).toBe(false)
	})
	test('rejects undefined', ()=>{
		expect(is_hono_instance(undefined)).toBe(false)
	})
	test('rejects plain function', ()=>{
		expect(is_hono_instance(()=>{})).toBe(false)
	})
	test('rejects object with only fetch', ()=>{
		expect(is_hono_instance({ fetch: ()=>{} })).toBe(false)
	})
	test('rejects object with only route', ()=>{
		expect(is_hono_instance({ route: ()=>{} })).toBe(false)
	})
	test('Hono instance has fetch and route methods', ()=>{
		const app = new Hono()
		expect(typeof app.fetch).toBe('function')
		expect(typeof app.route).toBe('function')
	})
})
