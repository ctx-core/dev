import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { static_export__file_path_ } from './index.js'
test('static_export__file_path_|/ returns index.html', ()=>{
	equal(static_export__file_path_('/', 'dist'), 'dist/index.html')
})
test('static_export__file_path_|/about returns about/index.html', ()=>{
	equal(static_export__file_path_('/about', 'dist'), 'dist/about/index.html')
})
test('static_export__file_path_|/nested/path returns nested/path/index.html', ()=>{
	equal(static_export__file_path_('/nested/path', 'dist'), 'dist/nested/path/index.html')
})
test('static_export__file_path_|/robots.txt with text/plain content-type returns bare file', ()=>{
	equal(static_export__file_path_('/robots.txt', 'dist', 'text/plain'), 'dist/robots.txt')
})
test('static_export__file_path_|/sitemap.xml with application/xml content-type returns bare file', ()=>{
	equal(static_export__file_path_('/sitemap.xml', 'dist', 'application/xml'), 'dist/sitemap.xml')
})
test('static_export__file_path_|/protocol.love with text/html content-type returns index.html', ()=>{
	equal(
		static_export__file_path_('/protocol.love', 'dist', 'text/html;charset=UTF-8'),
		'dist/protocol.love/index.html')
})
test('static_export__file_path_|/protocol.love without content-type falls back to bare file', ()=>{
	equal(static_export__file_path_('/protocol.love', 'dist'), 'dist/protocol.love')
})
test('static_export__file_path_|/rss.xml with application/xml returns bare file', ()=>{
	equal(static_export__file_path_('/rss.xml', 'dist', 'application/xml'), 'dist/rss.xml')
})
test('static_export__file_path_|/feed.json with application/json returns bare file', ()=>{
	equal(static_export__file_path_('/feed.json', 'dist', 'application/json'), 'dist/feed.json')
})
test('static_export__file_path_|/page.html with text/html returns page.html/index.html', ()=>{
	equal(
		static_export__file_path_('/page.html', 'dist', 'text/html'),
		'dist/page.html/index.html')
})
test('static_export__file_path_|/page with no extension and no content-type returns index.html', ()=>{
	equal(static_export__file_path_('/page', 'dist'), 'dist/page/index.html')
})
test.run()
