// Ported from https://github.com/jahredhope/promise-file-reader/blob/master/PromiseFileReader.js
export function readAsDataURL(file) {
	return readAs(file, 'DataURL')
}
export function readAsText(file) {
	return readAs(file, 'Text')
}
export function readAsArrayBuffer(file) {
	return readAs(file, 'ArrayBuffer')
}
function readAs(file:File, as) {
	if (!(file instanceof Blob)) {
		throw new TypeError('Must be a File or Blob')
	}
	return new Promise((resolve, reject)=>{
		const reader = new FileReader()
		reader.onload = e=>resolve(e.target.result)
		reader.onerror =
			e=>
				reject(
					new Error(
						`Error reading ${file.name}: ${e.target.result}`))
		reader[`readAs${as}`](file)
	})
}
