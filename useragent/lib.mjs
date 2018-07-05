/*!
 * Modified from:
 * express-useragent.js v0.1.8 (https://github.com/biggora/express-useragent/)
 * Copyright 2011-2015 Alexey Gordeyev
 * Licensed under MIT (https://github.com/biggora/express-useragent/blob/master/LICENSE)
 */
import { assign, clone, keys } from 'ctx-core/object/lib.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/useragent/lib.mjs'
export const BOTS = [
	'\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
	'googlebot',
	'baiduspider',
	'gurujibot',
	'yandexbot',
	'slurp',
	'msnbot',
	'bingbot',
	'facebookexternalhit',
	'linkedinbot',
	'twitterbot',
	'slackbot',
	'telegrambot',
	'applebot',
	'pingdom',
	'tumblr ',
	'Embedly',
	'spbot'
]
export const IS_BOT_REGEXP = new RegExp(`^.*(${BOTS.join('|')}).*$`)
export const versions = {
	Edge: /Edge\/([\d\w\.\-]+)/i,
	Firefox: /firefox\/([\d\w\.\-]+)/i,
	IE: /msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i,
	Chrome: /chrome\/([\d\w\.\-]+)/i,
	Chromium: /(?:chromium|crios)\/([\d\w\.\-]+)/i,
	Safari: /version\/([\d\w\.\-]+)/i,
	Opera: /version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i,
	Ps3: /([\d\w\.\-]+)\)\s*$/i,
	Psp: /([\d\w\.\-]+)\)?\s*$/i,
	Amaya: /amaya\/([\d\w\.\-]+)/i,
	SeaMonkey: /seamonkey\/([\d\w\.\-]+)/i,
	OmniWeb: /omniweb\/v([\d\w\.\-]+)/i,
	Flock: /flock\/([\d\w\.\-]+)/i,
	Epiphany: /epiphany\/([\d\w\.\-]+)/i,
	WinJs: /msapphost\/([\d\w\.\-]+)/i,
	PhantomJS: /phantomjs\/([\d\w\.\-]+)/i,
	UC: /UCBrowser\/([\d\w\.]+)/i
}
export const browsers = {
	Edge: /edge/i,
	Amaya: /amaya/i,
	Konqueror: /konqueror/i,
	Epiphany: /epiphany/i,
	SeaMonkey: /seamonkey/i,
	Flock: /flock/i,
	OmniWeb: /omniweb/i,
	Chromium: /chromium|crios/i,
	Chrome: /chrome/i,
	Safari: /safari/i,
	IE: /msie|trident/i,
	Opera: /opera|OPR/i,
	PS3: /playstation 3/i,
	PSP: /playstation portable/i,
	Firefox: /firefox/i,
	WinJs: /msapphost/i,
	PhantomJS: /phantomjs/i,
	UC: /UCBrowser/i
}
export const os = {
	Windows10: /windows nt 10\.0/i,
	Windows81: /windows nt 6\.3/i,
	Windows8: /windows nt 6\.2/i,
	Windows7: /windows nt 6\.1/i,
	UnknownWindows: /windows nt 6\.\d+/i,
	WindowsVista: /windows nt 6\.0/i,
	Windows2003: /windows nt 5\.2/i,
	WindowsXP: /windows nt 5\.1/i,
	Windows2000: /windows nt 5\.0/i,
	WindowsPhone8: /windows phone 8\./,
	OSXCheetah: /os x 10[._]0/i,
	OSXPuma: /os x 10[._]1(\D|$)/i,
	OSXJaguar: /os x 10[._]2/i,
	OSXPanther: /os x 10[._]3/i,
	OSXTiger: /os x 10[._]4/i,
	OSXLeopard: /os x 10[._]5/i,
	OSXSnowLeopard: /os x 10[._]6/i,
	OSXLion: /os x 10[._]7/i,
	OSXMountainLion: /os x 10[._]8/i,
	OSXMavericks: /os x 10[._]9/i,
	OSXYosemite: /os x 10[._]10/i,
	OSXElCapitan: /os x 10[._]11/i,
	OSXSierra: /os x 10[._]12/i,
	Mac: /os x/i,
	Linux: /linux/i,
	Linux64: /linux x86\_64/i,
	ChromeOS: /cros/i,
	Wii: /wii/i,
	PS3: /playstation 3/i,
	PSP: /playstation portable/i,
	iPad: /\(iPad.*os (\d+)[._](\d+)/i,
	iPhone: /\(iPhone.*os (\d+)[._](\d+)/i,
	Bada: /Bada\/(\d+)\.(\d+)/i,
	Curl: /curl\/(\d+)\.(\d+)\.(\d+)/i
}
export const platforms = {
	Windows: /windows nt/i,
	WindowsPhone: /windows phone/i,
	Mac: /macintosh/i,
	Linux: /linux/i,
	Wii: /wii/i,
	Playstation: /playstation/i,
	iPad: /ipad/i,
	iPod: /ipod/i,
	iPhone: /iphone/i,
	Android: /android/i,
	Blackberry: /blackberry/i,
	Samsung: /samsung/i,
	Curl: /curl/i
}
export const proto__useragent = {
	isAuthoritative: true,
	isMobile: false,
	isTablet: false,
	isiPad: false,
	isiPod: false,
	isiPhone: false,
	isAndroid: false,
	isBlackberry: false,
	isOpera: false,
	isIE: false,
	isEdge: false,
	isIECompatibilityMode: false,
	isSafari: false,
	isFirefox: false,
	isWebkit: false,
	isChrome: false,
	isKonqueror: false,
	isOmniWeb: false,
	isSeaMonkey: false,
	isFlock: false,
	isAmaya: false,
	isPhantomJS: false,
	isEpiphany: false,
	isDesktop: false,
	isWindows: false,
	isLinux: false,
	isLinux64: false,
	isMac: false,
	isChromeOS: false,
	isBada: false,
	isSamsung: false,
	isRaspberry: false,
	isBot: false,
	isCurl: false,
	isAndroidTablet: false,
	isWinJs: false,
	isKindleFire: false,
	isSilk: false,
	isCaptive: false,
	isSmartTV: false,
	isUC: false,
	silkAccelerated: false,
	browser: 'unknown',
	version: 'unknown',
	os: 'unknown',
	platform: 'unknown',
	geoIp: {},
	source: ''
}
export function _useragent(source$) {
	log(`${logPrefix}|_useragent`)
	let useragent = __useragent(source$)
	const { source } = useragent
	ensure__os__useragent(useragent, source)
	ensure__platform__useragent(useragent, source)
	ensure__browser__useragent(useragent, source)
	ensure__version__useragent(useragent, source)
	assign__Bot__useragent(useragent, source)
	assign__SmartTV__useragent(useragent, source)
	assign__Mobile__useragent(useragent, source)
	assign__AndroidTablet__useragent(useragent, source)
	assign__Tablet__useragent(useragent, source)
	assign__CompatibilityMode__useragent(useragent, source)
	assign__Silk__useragent(useragent, source)
	assign__KindleFire__useragent(useragent, source)
	assign__CaptiveNetwork__useragent(useragent, source)
	return useragent
}
export function __useragent(source$) {
	log(`${logPrefix}|__useragent`)
	const source = source$.replace(/^\s*/, '').replace(/\s*$/, '')
	return clone(proto__useragent, { source })
}
export function ensure__browser__useragent(useragent, source) {
	if (useragent.browser) return useragent
	let $
	switch (true) {
		case browsers.Edge.test(source):
			$ = { isEdge: true, browser: 'Edge' }
		case browsers.PhantomJS.test(source):
			$ = { isPhantomJS: true, browser: 'PhantomJS' }
		case browsers.Konqueror.test(source):
			$ = { isKonqueror: true, browser: 'Konqueror' }
		case browsers.Amaya.test(source):
			$ = { isAmaya: true, browser: 'Amaya' }
		case browsers.Epiphany.test(source):
			$ = { isEpiphany: true, browser: 'Epiphany' }
		case browsers.SeaMonkey.test(source):
			$ = { isSeaMonkey: true, browser: 'SeaMonkey' }
		case browsers.Flock.test(source):
			$ = { isFlock: true, browser: 'Flock' }
		case browsers.OmniWeb.test(source):
			$ = { isOmniWeb: true, browser: 'OmniWeb' }
		case browsers.Opera.test(source):
			$ = { isOpera: true, browser: 'Opera' }
		case browsers.Chromium.test(source):
			$ = { isChrome: true, browser: 'Chrome' }
		case browsers.Chrome.test(source):
			$ = { isChrome: true, browser: 'Chrome' }
		case browsers.Safari.test(source):
			$ = { isSafari: true, browser: 'Safari' }
		case browsers.WinJs.test(source):
			$ = { isWinJs: true, browser: 'WinJs' }
		case browsers.IE.test(source):
			$ = { isIE: true, browser: 'IE' }
		case browsers.PS3.test(source):
			$ = { isPS3: true, browser: 'PS3' }
		case browsers.PSP.test(source):
			$ = { isPSP: true, browser: 'PSP' }
		case browsers.Firefox.test(source):
			$ = { isFirefox: true, browser: 'Firefox' }
		case browsers.UC.test(source):
			$ = { isUC: true, browser: 'UC' }
	}
	if (!$) {
		// If the UA does not start with Mozilla guess the user agent.
		if (source.indexOf('Mozilla') !== 0 && /^([\d\w\-\.]+)\/[\d\w\.\-]+/i.test(source)) {
			$ = { isAuthoritative: false, browser: RegExp.$1 }
		} else {
			$ = { isAuthoritative: false, browser: 'unknown' }
		}
	}
	assign(useragent, $)
	return useragent
}
export function ensure__version__useragent(useragent, source) {
	if (useragent.version) return useragent
	let regex
	let version
	switch (useragent.browser) {
		case 'Edge':
			if (versions.Edge.test(source)) {
				version = RegExp.$1
			}
			break
		case 'PhantomJS':
			if (versions.PhantomJS.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Chrome':
			if (versions.Chrome.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Chromium':
			if (versions.Chromium.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Safari':
			if (versions.Safari.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Opera':
			if (versions.Opera.test(source)) {
				version = RegExp.$1 ? RegExp.$1 : RegExp.$2
			}
			break
		case 'Firefox':
			if (versions.Firefox.test(source)) {
				version = RegExp.$1
			}
			break
		case 'WinJs':
			if (versions.WinJs.test(source)) {
				version = RegExp.$1
			}
			break
		case 'IE':
			if (versions.IE.test(source)) {
				version = RegExp.$2 ? RegExp.$2 : RegExp.$1
			}
			break
		case 'ps3':
			if (versions.Ps3.test(source)) {
				version = RegExp.$1
			}
			break
		case 'psp':
			if (versions.Psp.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Amaya':
			if (versions.Amaya.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Epiphany':
			if (versions.Epiphany.test(source)) {
				version = RegExp.$1
			}
			break
		case 'SeaMonkey':
			if (versions.SeaMonkey.test(source)) {
				version = RegExp.$1
			}
			break
		case 'Flock':
			if (versions.Flock.test(source)) {
				version = RegExp.$1
			}
			break
		case 'OmniWeb':
			if (versions.OmniWeb.test(source)) {
				version = RegExp.$1
			}
			break
		case 'UCBrowser':
			if (versions.UC.test(source)) {
				version = RegExp.$1
			}
			break
		default:
			if (useragent.browser !== 'unknown') {
				regex = new RegExp(`${useragent.browser}[\\/ ]([\\d\\w\\.\\-]+)`, 'i')
				if (regex.test(source)) {
					version = RegExp.$1
				}
			}
	}
	if (!version) version = 'unknown'
	assign(useragent, { version })
	return useragent
}
export function ensure__os__useragent(useragent, string) {
	if (useragent.os) return useragent
	let $
	switch (true) {
		case os.WindowsVista.test(string):
			$ = { isWindows: true, os: 'Windows Vista' }
		case os.Windows7.test(string):
			$ = { isWindows: true, os: 'Windows 7' }
		case os.Windows8.test(string):
			$ = { isWindows: true, os: 'Windows 8' }
		case os.Windows81.test(string):
			$ = { isWindows: true, os: 'Windows 8.1' }
		case os.Windows10.test(string):
			$ = { isWindows: true, os: 'Windows 10.0' }
		case os.Windows2003.test(string):
			$ = { isWindows: true, os: 'Windows 2003' }
		case os.WindowsXP.test(string):
			$ = { isWindows: true, os: 'Windows XP' }
		case os.Windows2000.test(string):
			$ = { isWindows: true, os: 'Windows 2000' }
		case os.WindowsPhone8.test(string):
			$ = { os: 'Windows Phone 8' }
		case os.Linux64.test(string):
			$ = { isLinux: true, isLinux64: true, os: 'Linux 64' }
		case os.Linux.test(string):
			$ = { isLinux: true, os: 'Linux' }
		case os.ChromeOS.test(string):
			$ = { isChromeOS: true, os: 'Chrome OS' }
		case os.Wii.test(string):
			$ = { os: 'Wii' }
		case os.PS3.test(string):
			$ = { os: 'Playstation' }
		case os.PSP.test(string):
			$ = { os: 'Playstation' }
		case os.OSXCheetah.test(string):
			$ = { isMac: true, os: 'OS X Cheetah' }
		case os.OSXPuma.test(string):
			$ = { isMac: true, os: 'OS X Puma' }
		case os.OSXJaguar.test(string):
			$ = { isMac: true, os: 'OS X Jaguar' }
		case os.OSXPanther.test(string):
			$ = { isMac: true, os: 'OS X Panther' }
		case os.OSXTiger.test(string):
			$ = { isMac: true, os: 'OS X Tiger' }
		case os.OSXLeopard.test(string):
			$ = { isMac: true, os: 'OS X Leopard' }
		case os.OSXSnowLeopard.test(string):
			$ = { isMac: true, os: 'OS X Snow Leopard' }
		case os.OSXLion.test(string):
			$ = { isMac: true, os: 'OS X Lion' }
		case os.OSXMountainLion.test(string):
			$ = { isMac: true, os: 'OS X Mountain Lion' }
		case os.OSXMavericks.test(string):
			$ = { isMac: true, os: 'OS X Mavericks' }
		case os.OSXYosemite.test(string):
			$ = { isMac: true, os: 'OS X Yosemite' }
		case os.OSXElCapitan.test(string):
			$ = { isMac: true, os: 'OS X El Capitan' }
		case os.OSXSierra.test(string):
			$ = { isMac: true, os: 'macOS Sierra' }
		case os.Mac.test(string):
			$ = { isMac: true, os: 'OS X' }
		case os.iPad.test(string):
			$ = { isiPad: true, os: string.match(os.iPad)[0].replace('_', '.') }
		case os.iPhone.test(string):
			$ = { isiPhone: true, os: string.match(os.iPhone)[0].replace('_', '.') }
		case os.Bada.test(string):
			$ = { isBada: true, os: 'Bada' }
		case os.Curl.test(string):
			$ = { isCurl: true, os: 'Curl' }
		default:
			$ = { os: 'unknown' }
	}
	assign(useragent, $)
	return useragent
}
export function ensure__platform__useragent(useragent, source) {
	if (useragent.platform) return useragent
	let $
	switch (true) {
		case platforms.Windows.test(source):
			$ = { platform: 'Microsoft Windows' }
		case platforms.WindowsPhone.test(source):
			this.Agent.isWindowsPhone = true
			$ = { platform: 'Microsoft Windows Phone' }
		case platforms.Mac.test(source):
			$ = { platform: 'Apple Mac' }
		case platforms.Curl.test(source):
			$ = { platform: 'Curl' }
		case platforms.Android.test(source):
			this.Agent.isAndroid = true
			$ = { platform: 'Android' }
		case platforms.Blackberry.test(source):
			this.Agent.isBlackberry = true
			$ = { platform: 'Blackberry' }
		case platforms.Linux.test(source):
			$ = { platform: 'Linux' }
		case platforms.Wii.test(source):
			$ = { platform: 'Wii' }
		case platforms.Playstation.test(source):
			$ = { platform: 'Playstation' }
		case platforms.iPad.test(source):
			this.Agent.isiPad = true
			$ = { platform: 'iPad' }
		case platforms.iPod.test(source):
			this.Agent.isiPod = true
			$ = { platform: 'iPod' }
		case platforms.iPhone.test(source):
			this.Agent.isiPhone = true
			$ = { platform: 'iPhone' }
		case platforms.Samsung.test(source):
			this.Agent.isiSamsung = true
			$ = { platform: 'Samsung' }
		default:
			$ = { platform: 'unknown' }
	}
	assign(useragent, $)
	return useragent
}
export function assign__CompatibilityMode__useragent(useragent, source) {
	ensure__browser__useragent(useragent, source)
	let $
	if (useragent.isIE) {
		if (/Trident\/(\d)\.0/i.test(source)) {
			let tridentVersion = parseInt(RegExp.$1, 10)
			let version = parseInt(ua.Agent.version, 10)
			if (version === 7 && tridentVersion === 7) {
				$ = { isIECompatibilityMode: true, version: 11.0 }
			}
			if (version === 7 && tridentVersion === 6) {
				$ = { isIECompatibilityMode: true, version: 10.0 }
			}
			if (version === 7 && tridentVersion === 5) {
				$ = { isIECompatibilityMode: true, version: 9.0 }
			}
			if (version === 7 && tridentVersion === 4) {
				$ = { isIECompatibilityMode: true, version: 8.0 }
			}
		}
	}
	assign(useragent, $)
	return useragent
}
export function assign__Silk__useragent(useragent, source) {
	let $ = {}
	switch (true) {
		case new RegExp('silk', 'gi').test(source):
			$.isSilk = true
			break
		default:
	}
	if (/Silk-Accelerated=true/gi.test(source)) {
		$.SilkAccelerated = true
	}
	assign(useragent, $)
	return useragent
}
export function assign__KindleFire__useragent(useragent, source) {
	let $
	switch (true) {
		case /KFOT/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire' }
		case /KFTT/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HD' }
		case /KFJWI/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HD 8.9' }
		case /KFJWA/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HD 8.9 4G' }
		case /KFSOWI/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HD 7' }
		case /KFTHWI/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HDX 7' }
		case /KFTHWA/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HDX 7 4G' }
		case /KFAPWI/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HDX 8.9' }
		case /KFAPWA/gi.test(source):
			$ = { isKindleFire: true, browser: 'Kindle Fire HDX 8.9 4G' }
	}
	assign(useragent, $)
	return $
}
export function assign__CaptiveNetwork__useragent(useragent, source) {
	let useragent__
	switch (true) {
		case /CaptiveNetwork/gi.test(source):
			useragent__ =
				{
					isCaptive: true,
					isMac: true,
					platform: 'Apple Mac',
					browser: 'CaptiveNetwork'
				}
	}
	assign(useragent, useragent__)
	return useragent
}
export function assign__Mobile__useragent(useragent, source) {
	ensure__platform__useragent(useragent, source)
	let $
	switch (true) {
		case useragent.isWindows:
		case useragent.isLinux:
		case useragent.isMac:
		case useragent.isChromeOS:
			$ = { isDesktop: true }
			break
		case useragent.isAndroid:
		case useragent.isSamsung:
		case useragent.isiPad:
		case useragent.isiPod:
		case useragent.isiPhone:
		case useragent.isBada:
		case useragent.isBlackberry:
		case useragent.isWindowsPhone:
			$ = { isMobile: true, isDesktop: false }
			break
		default:
	}
	if (!$ && /mobile/i.test(source)) {
		$ = { isMobile: true, isDesktop: false }
	}
	assign(useragent, $)
	return useragent
}
export function assign__Tablet__useragent(useragent, source) {
	ensure__platform__useragent(useragent, source)
	let $
	switch (true) {
		case useragent.isiPad:
		case useragent.isAndroidTablet:
		case useragent.isKindleFire:
			$ = { isTablet: true }
			break
	}
	if (!$ && /tablet/i.test(source)) {
		$ = { isTablet: true }
	}
	assign(useragent, $)
	return useragent
}
export function assign__NginxGeoIP__useragent(useragent, headers) {
	const keys__ = keys(headers)
	for (let i = 0; i < keys__.length; i++) {
		const key = keys__[i]
		if (/^GEOIP/i.test(key)) {
			useragent.geoIp[key] = headers[key]
		}
	}
	return useragent
}
export function assign__Bot__useragent(useragent, source) {
	ensure__browser__useragent(useragent, source)
	let isBot = IS_BOT_REGEXP.exec(source.toLowerCase())
	if (isBot) {
		useragent.isBot = isBot[1]
	} else if (!useragent.isAuthoritative) {
		// Test unauthoritative parse for `bot` in UA to flag for bot
		useragent.isBot = /bot/i.test(source)
	}
	return useragent
}
export function assign__SmartTV__useragent(useragent, source) {
	let isSmartTV =
		new RegExp(
			'smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv', 'gi'
		).exec(source.toLowerCase())
	if (isSmartTV) {
		useragent.isSmartTV = isSmartTV[1]
	}
	return useragent
}
function assign__AndroidTablet__useragent(useragent, source) {
	ensure__platform__useragent(useragent, source)
	if (
		useragent.isAndroid
		&& !/mobile/i.test(source)
	) {
		useragent.isAndroidTablet = true
	}
	return useragent
}