export function mixin(target, source) {
	const prototype__target = target.prototype
			, prototype__source = source.prototype
			, propertyNames = Object.getOwnPropertyNames(prototype__source)
	for (let i=0; i < propertyNames.length; i++) {
		const propertyName = propertyNames[i]
		if (propertyName !== "constructor")
			Object.defineProperty(
				prototype__target,
				propertyName,
				Object.getOwnPropertyDescriptor(prototype__source, propertyName))
	}
	return target
}