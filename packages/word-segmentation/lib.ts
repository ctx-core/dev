import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { createInterface } from 'readline'
import { map, flatten } from '@ctx-core/array'
import { _title_case } from '@ctx-core/string'
import { ReadableStream, WritableStream, } from 'memory-streams'
export class Aspell {
	child_process:ChildProcessWithoutNullStreams
	private queue__ = []
	constructor(__line) {
		this.child_process = spawn('aspell', ['-a'])
		const { child_process } = this
		child_process.stderr.pipe(process.stderr)
		const rl = createInterface(child_process.stdout)
		rl.on('line', __line.bind(this))
	}
	get queue() {
		return this.queue__
	}
	async run(word:string) {
		return new Promise((resolve, reject)=>{
			this.queue__.push({ word, resolve, reject })
			this.child_process.stdin.write(`${word}\n`)
		})
	}
	end() {
		this.child_process.stdin.end()
	}
}
export class Aspell__top extends Aspell {
	aspell__compound:Aspell__compound
	constructor(aspell__compound) {
		super(__line__top)
		this.aspell__compound = aspell__compound
	}
}
export class Aspell__compound extends Aspell {
	constructor() {
		super(__line__compound)
	}
}
export function _aspell(__line) {
	return new Aspell(__line)
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
	const aspell__compound = new Aspell__compound()
	const aspell__top = new Aspell__top(aspell__compound)
	return {
		aspell__top,
		aspell__compound,
	}
}
export function close__streams__word_segmentation(streams__word_segmentation) {
	const {
		aspell__top,
		aspell__compound,
	} = streams__word_segmentation
	aspell__top.end()
	aspell__compound.end()
}
export function _stream_a1__compound_words() {
	const streams__word_segmentation = _streams__word_segmentation()
	const readable = new ReadableStream('')
	const writable = new WritableStream()
	const rl = createInterface(readable)
	rl.on('line', line=>{
		segment__words(line, streams__word_segmentation)
	})
	return [readable, writable]
}
export type Opts__segment__words = {
	aspell__top?,
	aspell__compound?,
}
export async function segment__words(
	phrases,
	{
		aspell__top,
		aspell__compound,
	}:Opts__segment__words = {}
) {
	if (!phrases) return phrases
	if (!aspell__compound) {
		aspell__compound = new Aspell__compound()
	}
	if (!aspell__top) {
		aspell__top = new Aspell__top(aspell__compound)
	}
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
				token=>new Promise(async resolve=>{
					if (!token) {
						resolve([''])
						return
					}
					if (/\W/.test(token) || /^[0-9]+$/.test(token)) {
						resolve([token])
						return
					}
					resolve(await aspell__top.run(token))
				}))
		return await Promise.all(a1__promise)
	}
}
async function _compound_word_a1(word, aspell__compound:Aspell) {
//	return await _compound_word_a1__left_first(word, { queue__compound, aspell__compound })
//	return await _compound_word_a1__right_first(word, { queue__compound, aspell__compound })
	const compound_word_a1__right_first =
		await _compound_word_a1__right_first(word, aspell__compound)
	const compound_word_a1__left_first =
		await _compound_word_a1__left_first(word, aspell__compound)
	return (
		(compound_word_a1__right_first.length <= compound_word_a1__left_first.length)
		? compound_word_a1__left_first
		: compound_word_a1__right_first
	)
}
async function _compound_word_a1__right_first(word, aspell__compound):Promise<string[]> {
	const { length } = word
	const word_a1:string[] = await aspell__compound.run(word)
	if (word_a1) return word_a1 || []
	for (let right_idx = 0; right_idx < length; right_idx += 1) {
		let word__right
		let word_a1__right
		word__right = word.slice(right_idx, length)
		if (!word__right) continue
		word_a1__right = await aspell__compound.run(word__right)
		if (!word_a1__right) {
			continue
		}
		let left_idx = right_idx
		let word__left
		let word_a1__left
		do {
			word__left = word.slice(0, left_idx)
			if (left_idx < 0 || !word__left) break
			word_a1__left = await aspell__compound.run(word__left)
			if (word_a1__left) break
			left_idx -= 1
		} while (word__left)
		let word_a1__center
		const word__center = word.slice(left_idx, right_idx)
		if (word__center) {
			word_a1__center = await _compound_word_a1(word__center, aspell__compound)
		} else {
			word_a1__center = []
		}
		if (word_a1__left && word_a1__center && word_a1__right) {
			return [].concat(word_a1__left).concat(word_a1__center).concat(word_a1__right)
		}
	}
	return [word]
}
async function _compound_word_a1__left_first(word, aspell__compound):Promise<string[]> {
	const { length } = word
	let word_a1__right
	for (let left_idx = 0; left_idx < length; left_idx += 1) {
		let word__left = word.slice(0, length - left_idx)
		const word_a1__left:string[] = await aspell__compound.run(word__left)
		if (!word_a1__left) continue
		let word__right
		let right_idx = left_idx
		do {
			word__right = word.slice(length - right_idx, length)
			if (!word__right) break
			word_a1__right = await aspell__compound.run(word)
			if (word_a1__right) {
				break
				// return [].concat(word_a1__left).concat(word_a1__right)
			}
			right_idx -= 1
		} while (word__right)
		let word_a1__center
		const word__center = word.slice(left_idx, right_idx)
		if (word__center) {
			word_a1__center = await aspell__compound.run(word__right)
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
async function __line__top(this:Aspell__top, line) {
	if (!line) return
	const {
		queue: queue__top,
		aspell__compound,
	} = this
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
			resolve(compound_word_a1)
		} else if (char__0 === '&') {
			compound_word_a1 =
				_title_case__compound__line__aspell(line)
				|| (await _compound_word_a1(word, aspell__compound))
			resolve(compound_word_a1)
		} else {
			compound_word_a1 =
				await _compound_word_a1(word, aspell__compound)
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
function __line__compound(this:Aspell__compound, line) {
	if (!line) return
	const { queue } = this
	const char__0 = line.charAt(0)
	if (char__0 === '@') return
	const top = queue.shift()
	if (!top) return
	let word_a1
	const { word, resolve } = top
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
