import { sleep } from '@ctx-core/sleep'
import webdriver from 'selenium-webdriver'
import 'chromedriver'
import { put__arr__pathname__medium } from './s3'
import { _arr__pathname__medium } from './fetch'
export async function put__cache__scrape__webdriver(options = {}) {
	const arr__pathname__medium = await _arr__href__medium(options)
	console.info('arr__pathname__medium.length', arr__pathname__medium.length)
	await put__arr__pathname__medium(arr__pathname__medium)
}
export async function _arr__href__medium(opts = {}) {
	const {
		INSTAGRAM_NAME = process.env.INSTAGRAM_NAME,
		reload,
	} = opts
	const arr__pathname__medium__current =
		reload
		? []
		: await _arr__pathname__medium(opts)
	const set__media__current = new Set(arr__pathname__medium__current)
	const Capabilities__chrome = webdriver.Capabilities.chrome()
	Capabilities__chrome.set('chromeOptions', { args: ['--headless'] })
	const driver = new webdriver.Builder()
		.forBrowser('chrome')
		.withCapabilities(Capabilities__chrome)
		.build()
	await driver.get(`https://www.instagram.com/${INSTAGRAM_NAME}/`)
	let arr__href__medium = arr__pathname__medium__current
	let iteration = { length__array__href: 0, count__iteration: 0 }
	do {
		await driver.executeScript('window.scrollBy(0, window.innerHeight)')
		const arr__href__ = JSON.parse(await driver.executeScript(`
function compact(array) {
	if (!array) return array
	for (let i = array.length; i >= 0; --i) {
		if (array[i] == null) {
			array.splice(i, 1)
		}
	}
	return array
}
return JSON.stringify(
	compact(
		Array.from(
			document.querySelectorAll('[href*="/p/"]')
		).map(a => a.href && new URL(a.href).pathname)
	)
)
		`.trim()))
		arr__href__medium = [...new Set([...arr__href__, ...arr__href__medium])]
		if (iteration.length__array__href != arr__href__medium.length) {
			iteration = {
				length__array__href: arr__href__medium.length,
				count__iteration: 0
			}
		} else {
			iteration.count__iteration += 1
		}
		if (_any__set__current(arr__href__)) break
		await sleep(500)
		console.debug({ 'arr__href__medium.length': arr__href__medium.length })
	} while (iteration.count__iteration < 10)
	driver.quit()
	return arr__href__medium
	function _any__set__current(array__href__) {
		for (let i = 0; i < array__href__.length; i++) {
			if (set__media__current.has(array__href__[i])) return true
		}
		return false
	}
}
export function _created_time(medium) {
	const dom = new JSDOM(medium.html)
	const time = dom.window.document.querySelector('time')
	const datetime = time.getAttribute('datetime')
	return new Date(datetime).getTime()
}