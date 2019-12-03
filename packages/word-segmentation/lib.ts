import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { createInterface } from 'readline'
import { each, map, flatten, reject as reject__a1, reduce, sort } from '@ctx-core/array'
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
export function _title_case__compound__line__aspell(line):string[] {
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
					const a1__aspell__top = await aspell__top.run(token)
					resolve(a1__aspell__top)
				}))
		return await Promise.all(a1__promise)
	}
}
async function _compound_word_a1(word, aspell__compound:Aspell) {
	return _compound_word_a1__word_reduction(word, aspell__compound)
}
async function _compound_word_a1__word_reduction(word, aspell__compound):Promise<string[]> {
	const compound_word_a2 = await _compound_word_a2__word_reduction__backward(word, aspell__compound)
	const compound_word_a3__cleaned =
		map(compound_word_a2, compound_word_a1=>{
			const compound_word_a1__cleaned =
				reject__a1(compound_word_a1,
					(compound_word:string)=>
						compound_word.toLowerCase() === 'and'
				)
			return [compound_word_a1, compound_word_a1__cleaned]
		})
	const sorted_word_a3__cleaned =
		sort(compound_word_a3__cleaned, (l, r)=>{
			const l_compound_word_a1__cleaned = l[1]
			const r_compound_word_a1__cleaned = r[1]
			if (l_compound_word_a1__cleaned.length < r_compound_word_a1__cleaned.length) {
				return -1
			} else if (l.length > r.length) {
				return 1
			}
			const _sum__lt__3 = (sum__lt__3, word)=>{
				return sum__lt__3 + Math.max(3 - word.length, 0)
			}
			const l_sum__lt__3 = reduce(l_compound_word_a1__cleaned, _sum__lt__3, 0)
			const r_sum__lt__3 = reduce(r_compound_word_a1__cleaned, _sum__lt__3, 0)
			if (l_sum__lt__3 < r_sum__lt__3) {
				return -1
			}
			if (l_sum__lt__3 > r_sum__lt__3) {
				return 1
			}
			return 0
		})
	const [compound_word_a1] = sorted_word_a3__cleaned[0]
	return compound_word_a1
}
async function _compound_word_a2__word_reduction__backward(word, aspell__compound):Promise<string[][]> {
	if (!word) return []
	const word_a1 = await aspell__compound.run(word)
	if (word_a1) {
		return [word_a1]
	}
	const { length } = word
	const valid_wordset_a2:string[][] = []
	const begin_subword_a2:string[][] = []
	for (let idx = length - 1; idx >= 0; idx -= 1) {
		let begin_idx__candidate = 0
		let end_idx__candidate = idx + 1
		let begin_subword = word.slice(begin_idx__candidate, end_idx__candidate)
		const begin_subword_a1 = await aspell__compound.run(begin_subword)
		if (!begin_subword_a1) continue
		begin_subword_a2.push(begin_subword_a1)
	}
	const starter_word_a1 = ['the', 'for']
	const begin_subword_a2__sort = sort(begin_subword_a2, (l:string[], r:string[])=>{
			return (
				(l.length === 1 && starter_word_a1.indexOf(l[0].toLowerCase()) > -1)
				? -1
				: (r.length === 1 && starter_word_a1.indexOf(r[0].toLowerCase()) > -1)
					? 1
					//region plural word or next word begins with s?
					: (
							l[0].slice(l[0].length - 1).toLowerCase() === 's'
							&& (l[0].length === (r[0].length + 1))
						) ? 1
							: (
									r[0].slice(r[0].length - 1).toLowerCase() === 's'
									&& (r[0].length === (l[0].length + 1))
								)
								? -1
							//endregion
								: l[0].length > r[0].length
									? -1
									: l[0].length < r[0].length
										? 1
										: l[0] > r[0]
											? -1
											: 1
			)
		}
	)
	for (let idx = 0; idx < begin_subword_a2__sort.length; idx += 1) {
		const subword_a1 = begin_subword_a2[idx]
		const [subword] = subword_a1
		const rest_idx = subword.length
		const subword__rest = word.slice(rest_idx)
		const a1__subword_rest = await aspell__compound.run(subword__rest)
		if (a1__subword_rest) {
			valid_wordset_a2.push(subword_a1.concat(...a1__subword_rest))
			break
		}
		const subword_a2__rest =
			await _compound_word_a2__word_reduction__backward(
				subword__rest,
				aspell__compound)
		each(subword_a2__rest, word_a1__rest=>
			valid_wordset_a2.push(subword_a1.concat(...word_a1__rest))
		)
		if (subword_a2__rest.length) {
			if (starter_word_a1.indexOf(subword.toLowerCase()) > -1) {
				continue
			}
			const next_subword_a1 = begin_subword_a2__sort[idx + 1]
			const next_subword = next_subword_a1 && next_subword_a1[0]
			if (
				next_subword
				&& (
					(
						next_subword.slice(next_subword.length - 1) === 's'
						&& (subword.length + 1) === next_subword.length
					)
					|| subword.length === (next_subword.length + 1)
				)
			) {
				continue
			}
			break
		}
	}
	return valid_wordset_a2
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
			return
		}
		compound_word_a1 = await _compound_word_a1(word, aspell__compound)
		resolve(compound_word_a1)
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
	resolve(null)
}
