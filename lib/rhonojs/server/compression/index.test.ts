import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { compression_middleware_ } from './index.js'
test('compression_middleware_|loads', ()=>{
	equal(typeof compression_middleware_, 'function')
})
test('compression_middleware_|returns middleware', ()=>{
	const middleware = compression_middleware_()
	equal(typeof middleware, 'function')
})
test('compression_middleware_|accepts gzip type', ()=>{
	const middleware = compression_middleware_({ type: 'gzip' })
	equal(typeof middleware, 'function')
})
test('compression_middleware_|accepts deflate type', ()=>{
	const middleware = compression_middleware_({ type: 'deflate' })
	equal(typeof middleware, 'function')
})
test.run()
