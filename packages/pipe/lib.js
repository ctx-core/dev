import { Socket } from 'net'
export function _is__piped() {
	return Socket === process.stdin.constructor
}
export async function _txt__piped() {
	let txt__file__piped = ''
	return new Promise((resolve, reject) => {
		if (_is__piped()) {
			process.stdin.on('readable', () => {
				let chunk
				while ((chunk = process.stdin.read()) !== null) {
					txt__file__piped += chunk
				}
			})
			process.stdin.on('end', () => {
				resolve(txt__file__piped.trim().split('\n'))
			})
		} else {
			resolve(undefined)
		}
	})
}