import { join } from 'node:path'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { is_asset_, object_store_asset_url_, object_store_asset_url_sync_, ASSET_EXTENSIONS } from './index.js'
const dir = new URL('.', import.meta.url).pathname
test('object_store_asset_url_sync_ generates correct URL', ()=>{
	const content = Buffer.from('test content')
	const url = object_store_asset_url_sync_('/path/to/image.webp', content, {
		asset_base_url: 'https://assets.example.com',
	})
	assert.match(url, /^https:\/\/assets\.example\.com\/image-[A-F0-9]{8}\.webp$/)
})
test('object_store_asset_url_sync_ with base_path', ()=>{
	const content = Buffer.from('test content')
	const url = object_store_asset_url_sync_('/path/to/video.mp4', content, {
		asset_base_url: 'https://cdn.example.com/',
		base_path: 'v1',
	})
	assert.match(url, /^https:\/\/cdn\.example\.com\/v1\/video-[A-F0-9]{8}\.mp4$/)
})
test('object_store_asset_url_sync_ with custom hash_length', ()=>{
	const content = Buffer.from('test content')
	const url = object_store_asset_url_sync_('/path/to/font.woff2', content, {
		asset_base_url: 'https://assets.example.com',
		hash_length: 12,
	})
	assert.match(url, /^https:\/\/assets\.example\.com\/font-[A-F0-9]{12}\.woff2$/)
})
test('object_store_asset_url_sync_ deterministic hash', ()=>{
	const content = Buffer.from('same content')
	const url1 = object_store_asset_url_sync_('/a/image.png', content, {
		asset_base_url: 'https://cdn.example.com',
	})
	const url2 = object_store_asset_url_sync_('/b/image.png', content, {
		asset_base_url: 'https://cdn.example.com',
	})
	assert.is(url1, url2)
})
test('is_asset_ matches known extensions', ()=>{
	assert.ok(is_asset_('image.webp'))
	assert.ok(is_asset_('video.mp4'))
	assert.ok(is_asset_('font.woff2'))
	assert.ok(is_asset_('icon.svg'))
	assert.ok(is_asset_('photo.jpg'))
	assert.ok(is_asset_('photo.jpeg'))
	assert.ok(is_asset_('audio.mp3'))
	assert.ok(is_asset_('doc.pdf'))
})
test('is_asset_ rejects non-asset extensions', ()=>{
	assert.not.ok(is_asset_('script.js'))
	assert.not.ok(is_asset_('style.css'))
	assert.not.ok(is_asset_('page.html'))
	assert.not.ok(is_asset_('data.json'))
	assert.not.ok(is_asset_('module.ts'))
})
test('object_store_asset_url_ async reads file', async ()=>{
	const url = await object_store_asset_url_(join(dir, 'package.json'), {
		asset_base_url: 'https://assets.example.com',
	})
	assert.match(url, /^https:\/\/assets\.example\.com\/package-[A-F0-9]{8}\.json$/)
})
test.run()
