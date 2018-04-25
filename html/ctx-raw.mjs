export function init(tag) {
	tag.on('update', onupdate)
	function onupdate() {
		tag.root.innerHTML = tag.opts.html
	}
}