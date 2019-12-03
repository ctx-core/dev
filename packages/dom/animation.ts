const { max, min, abs, pow, sin, cos, PI } = Math
/**
 *
 * @param scrollTargetY
 * @param speed
 * @param easing
 * @see {@link https://stackoverflow.com/questions/12199363/scrollto-with-animation#answer-26798337}
 */
export function scrollToY(scrollTargetY, speed, easing) {
	// first add raf shim
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	const requestAnimationFrame = (() =>
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			// @ts-ignore
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60)
			}
	)()
	// scrollTargetY: the target scrollY property of the window
	// speed: time in pixels per second
	// easing: easing equation to use
	const { scrollY } = window
	scrollTargetY = scrollTargetY || 0
	speed = speed || 2000
	easing = easing || 'easeOutSine'
	let currentTime = 0
	// min time .1, max time .8 seconds
	const time =
		max(
			.1,
			min(
				abs(scrollY - scrollTargetY) / speed,
				.8))
	// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
	const easingEquations = {
		easeOutSine(pos) {
			return sin(pos * (PI / 2))
		},
		easeInOutSine(pos) {
			return (-0.5 * (cos(PI * pos) - 1))
		},
		easeInOutQuint(pos) {
			if ((pos /= 0.5) < 1) {
				return 0.5 * pow(pos, 5)
			}
			return 0.5 * (pow((pos - 2), 5) + 2)
		},
	}
	// add animation loop
	function tick() {
		currentTime += 1 / 60
		const p = currentTime / time
		const t = easingEquations[easing](p)
		if (p < 1) {
			requestAnimationFrame(tick)
			window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
		} else {
			console.log('scroll done')
			window.scrollTo(0, scrollTargetY)
		}
	}
	// call it once to get started
	tick()
}
