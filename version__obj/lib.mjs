export function lazyload__self(
	self,
	version,
	symbol__cache,
	symbol__version,
	$value
) {
	if (self[symbol__version] != version) {
		self[symbol__version] = version
		self[symbol__cache] = $value()
	}
	return self[symbol__cache]
}