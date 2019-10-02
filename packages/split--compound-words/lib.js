import { spawn } from 'child_process'
import { createInterface } from 'readline'
import { map, flatten } from '@ctx-core/array'
import { _title_case } from '@ctx-core/string'
export async function split__compound_words(phrases) {
	const [aspell__top, rl__aspell__top] = _a1__aspell()
	const queue__top = []
	rl__aspell__top.on('line', __line__top)
	const [aspell__compound, rl__aspell__compound] = _a1__aspell()
	const queue__compound = []
	rl__aspell__compound.on('line', __line__compound)
	const a2__token__corrected_word = await _a2__token__corrected_word()
	return (
		flatten(a2__token__corrected_word)
			.join(' ')
			.replace(/\s+,\s+/g, ', ')
			.replace(/\s+-\s+/g, '-')
	)
	function _a1__aspell() {
		const aspell = spawn('aspell', ['-a'])
		aspell.stderr.pipe(process.stderr)
		return [aspell, createInterface(aspell.stdout)]
	}
	async function _a2__token__corrected_word() {
		const token_a1 = _token_a1(phrases)
		return await Promise.all(
			map(token_a1,
				token => new Promise((resolve, reject) => {
					if (/\W/.test(token)) {
						resolve([token])
						return
					}
					const word = token
					queue__top.push({ word, resolve, reject })
					aspell__top.stdin.write(`${word}\n`)
				})))
	}
	async function __line__top(line) {
		if (!line) return
		const char__0 = line.charAt(0)
		if (char__0 === '@') return
		if (char__0 === 'E') return
		const { word, resolve, reject } = queue__top.shift()
		let compound_word_a1
		if (char__0 === '*') {
			compound_word_a1 = [word]
			resolve(compound_word_a1)
		} else if (char__0 === '&') {
			resolve(
				_title_case__compound__line__aspell(line)
				|| (await _compound_word_a1(word))
			)
		} else {
			resolve(await _compound_word_a1(word))
		}
	}
	async function _compound_word_a1(word) {
		const { length } = word
		for (let i = 0; i < length; i += 1) {
			let word__left = word.slice(0, length - i)
			const word_a1__left =
				await new Promise((resolve, reject) => {
					queue__compound.push({ word: word__left, resolve, reject })
					aspell__compound.stdin.write(`${word__left}\n`)
				})
			if (!word_a1__left) continue
			let word__right = word.slice(length - i, length)
			if (!word__right) {
				return word_a1__left
			}
			const word_a1__right = await _compound_word_a1(word__right)
			if (word_a1__right) {
				return [].concat(word_a1__left).concat(word_a1__right)
			}
		}
		return [word]
	}
	function __line__compound(line) {
		if (!line) return
		const char__0 = line.charAt(0)
		if (char__0 === '@') return
		const { word, resolve, reject } = queue__compound.shift()
		if (char__0 === '*') {
			resolve([word])
			return
		}
		if (char__0 === '&') {
			resolve(_title_case__compound__line__aspell(line))
			return
		}
		resolve(null)
	}
}
export function _token_a1(phrases) {
  return phrases.split(/\s|\b/)
}
export function _title_case__compound__line__aspell(line) {
	const a1__alt = line.split(': ')[1].split(', ')[0].split(' ')
	if (a1__alt.length < 2) return
	return map(
		line.split(': ')[1].split(', ')[0].split(' '),
		_title_case
	)
}
