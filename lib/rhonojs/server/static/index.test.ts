import { app_ctx } from 'rebuildjs/server'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('static_middleware_|loads', ()=>{
	equal(1, 1)
})
test.run()
