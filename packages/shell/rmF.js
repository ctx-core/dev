import shell from 'shelljs'
export default function rmF() {
	Array.prototype.slice.call(arguments, 0).forEach(function (path) {
		shell.rm('-f', path)
	})
}