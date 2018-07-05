/**
 * @see {@link https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md}
 * @todo Remove on IE Edge (> 11)
 */
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this)
			}
		})
	})
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])
