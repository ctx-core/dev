import { spawn } from 'child_process'
import { createInterface } from 'readline'
import { map, flatten } from '@ctx-core/array'
import { _title_case } from '@ctx-core/string'
import { ReadableStream, WritableStream, } from 'memory-streams'
let count__aspell__top = 0
let count__aspell__top__processed = 0
export function _aspell(__line) {
	const aspell = spawn('aspell', ['-a'])
	aspell.stderr.pipe(process.stderr)
	const rl = createInterface(aspell.stdout)
	rl.on('line', __line.bind(aspell))
	return aspell
}
export function _token_a1(phrases) {
	return phrases
		//		.replace(/(.+)and(.*)/ig, '$1 and $2')
		.split(/(\S+'\S)|\s+|\b/)
}
export function _title_case__compound__line__aspell(line) {
	const line_a1 = line.split(': ')
	const word = line_a1[0].split(' ')[1]
	const word__alt = line_a1[1].split(', ')[0]
	const a1__alt = word__alt.split(' ')
	if (
		a1__alt.length < 2 && a1__alt[0].slice(-2) !== '\'s'
		|| word.replace(/\W/g, '') != word__alt.replace(/\W/g, '')
	) return
	return map(a1__alt, _title_case)
}
export function _streams__word_segmentation() {
	const queue__compound = []
	const aspell__compound =
		_aspell(
			_fn__line__compound(queue__compound))
	const queue__top = []
	const aspell__top =
		_aspell(
			_fn__line__top(queue__top, {
				queue__compound,
				aspell__compound,
			}))
	return {
		aspell__top,
		queue__top,
		aspell__compound,
		queue__compound,
	}
}
export function close__streams__word_segmentation(streams__word_segmentation) {
	const {
		aspell__top,
		aspell__compound,
	} = streams__word_segmentation
	aspell__top.stdin.end()
	aspell__compound.stdin.end()
}
export function _stream_a1__compound_words() {
	const streams__word_segmentation = _streams__word_segmentation()
	const readable = new ReadableStream()
	const writable = new WritableStream()
	const rl = createInterface(readable)
	rl.on('line', line => {
		segment__words(line, streams__word_segmentation)
	})
	return [readable, writable]
}
export async function segment__words(
	phrases,
	{
		aspell__top,
		aspell__compound,
		queue__top,
		queue__compound,
	} = {}
) {
	if (!phrases) return phrases
	if (!aspell__compound || !queue__compound) {
		queue__compound = []
		aspell__compound = _aspell(_fn__line__compound(queue__compound))
	}
	if (!aspell__top || !queue__top) {
		queue__top = []
		aspell__top =
			_aspell(
				_fn__line__top(queue__top, {
					queue__compound,
					aspell__compound
				}))
	}
	console.debug('segment__words|debug|1', {
		phrases,
	})
	const a2__token__corrected_word = await _a2__token__corrected_word()
	return (
		flatten(a2__token__corrected_word)
			.join(' ')
			.trim()
			.replace(/\s+,\s+/g, ', ')
			.replace(/\s+-\s+/g, '-')
			.replace(/\s+\/\s+/g, '-')
			.replace(/\s+\./g, '.')
			.replace(/\s+/g, ' ')
	)
	async function _a2__token__corrected_word() {
		const token_a1 = _token_a1(phrases)
		const a1__promise =
			map(token_a1,
				token => new Promise((resolve, reject) => {
					if (!token) {
						resolve([''])
						return
					}
					if (/\W/.test(token) || /^[0-9]+$/.test(token)) {
						resolve([token])
						return
					}
					const word = token
					count__aspell__top += 1
					queue__top.push({ word, resolve, reject })
					aspell__top.stdin.write(`${word}\n`)
				}))
		return await Promise.all(a1__promise)
	}
}
async function _compound_word_a1(word, { queue__compound, aspell__compound }) {
//	return await _compound_word_a1__left_first(word, { queue__compound, aspell__compound })
//	return await _compound_word_a1__right_first(word, { queue__compound, aspell__compound })
	const compound_word_a1__right_first = await _compound_word_a1__right_first(word, { queue__compound, aspell__compound })
	const compound_word_a1__left_first = await _compound_word_a1__left_first(word, { queue__compound, aspell__compound })
	return (
		(compound_word_a1__right_first.length <= compound_word_a1__left_first.length)
		? compound_word_a1__left_first
		: compound_word_a1__right_first
	)
}
async function _compound_word_a1__right_first(word, { queue__compound, aspell__compound }) {
	const { length } = word
	const word_a1 = await new Promise((resolve, reject) => {
		queue__compound.push({ word, resolve, reject })
		aspell__compound.stdin.write(`${word}\n`)
	})
	if (word_a1) return word_a1
	for (let right_idx = 0; right_idx < length; right_idx += 1) {
		let word__right
		let word_a1__right
		word__right = word.slice(right_idx, length)
		if (!word__right) continue
		word_a1__right =
			await new Promise((resolve, reject) => {
				queue__compound.push({ word: word__right, resolve, reject })
				aspell__compound.stdin.write(`${word__right}\n`)
			})
		if (!word_a1__right) {
			continue
		}
		let left_idx = right_idx
		let word__left
		let word_a1__left
		do {
			word__left = word.slice(0, left_idx)
			if (left_idx < 0 || !word__left) break
			word_a1__left =
				await new Promise((resolve, reject) => {
					queue__compound.push({ word: word__left, resolve, reject })
					aspell__compound.stdin.write(`${word__left}\n`)
				})
			if (word_a1__left) break
			left_idx -= 1
		} while (word__left)
		let word_a1__center
		const word__center = word.slice(left_idx, right_idx)
		if (word__center) {
			word_a1__center = await _compound_word_a1(word__center, { queue__compound, aspell__compound })
		} else {
			word_a1__center = []
		}
		if (word_a1__left && word_a1__center && word_a1__right) {
			return [].concat(word_a1__left).concat(word_a1__center).concat(word_a1__right)
		}
	}
	return [word]
}
async function _compound_word_a1__left_first(word, { queue__compound, aspell__compound }) {
	const { length } = word
	let word_a1__right
	for (let left_idx = 0; left_idx < length; left_idx += 1) {
		let word__left = word.slice(0, length - left_idx)
		const word_a1__left =
			await new Promise((resolve, reject) => {
				queue__compound.push({ word: word__left, resolve, reject })
				aspell__compound.stdin.write(`${word__left}\n`)
			})
		if (!word_a1__left) continue
		let word__right
		let right_idx = left_idx
		do {
			word__right = word.slice(length - right_idx, length)
			if (!word__right) break
			word_a1__right =
				await new Promise((resolve, reject) => {
					queue__compound.push({ word: word__right, resolve, reject })
					aspell__compound.stdin.write(`${word__right}\n`)
				})
			if (word_a1__right) {
				break
				return [].concat(word_a1__left).concat(word_a1__right)
			}
			right_idx -= 1
		} while (word__right)
		let word_a1__center
		const word__center = word.slice(left_idx, right_idx)
		if (word__center) {
			word_a1__center =
				await new Promise((resolve, reject) => {
					queue__compound.push({ word: word__center, resolve, reject })
					aspell__compound.stdin.write(`${word__right}\n`)
				})
		} else {
			word_a1__center = []
		}
		if (word_a1__left && word_a1__center && word_a1__right) {
			return [].concat(word_a1__left).concat(word_a1__center).concat(word_a1__right)
		}
		return word_a1__left
	}
	return [word]
}
function _fn__line__top(
	queue__top, {
		queue__compound,
		aspell__compound,
	}
) {
	return async function __line__top(line) {
		if (!line) return
		const char__0 = line.charAt(0)
		if (char__0 === '@') return
		if (char__0 === 'E') return
		const top = queue__top.length && queue__top.shift()
		if (!top) return
		const { word, resolve, reject } = top
		let compound_word_a1
		try {
			if (char__0 === '*') {
				compound_word_a1 = [word]
				count__aspell__top__processed += 1
				resolve(compound_word_a1)
			} else if (char__0 === '&') {
				compound_word_a1 =
					_title_case__compound__line__aspell(line)
					|| (await _compound_word_a1(word, { queue__compound, aspell__compound }))
				count__aspell__top__processed += 1
				resolve(compound_word_a1)
			} else {
				compound_word_a1 =
					await _compound_word_a1(word, { queue__compound, aspell__compound })
				count__aspell__top__processed += 1
				resolve(compound_word_a1)
			}
		} catch (err) {
			console.error('error|debug|1')
			console.error(err)
			console.debug('error|debug|1')
			console.debug(err)
			reject(err)
		}
	}
}
export function _fn__line__compound(queue__compound) {
	return function __line__compound(line) {
		if (!line) return
		const char__0 = line.charAt(0)
		if (char__0 === '@') return
		const top = queue__compound.shift()
		if (!top) return
		let word_a1
		const { word, resolve, reject } = top
		if (char__0 === '*') {
			word_a1 = [word]
			resolve(word_a1)
			return
		}
		if (char__0 === '&') {
			word_a1 = _title_case__compound__line__aspell(line)
			resolve(word_a1)
			return
		}
		resolve(null)
	}
}
