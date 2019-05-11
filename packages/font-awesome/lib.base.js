export const icons = {}
export function get__icon(name__icon) {
  return icons[name__icon]
}
export function _has__icon(key__icon) {
  return !!icons[key__icon]
}
export function register__icon(ctx__icon) {
	Object.keys(ctx__icon).forEach((name) => {
		const icon = ctx__icon[name]
		if (!icon.paths) {
			icon.paths = []
		}
		if (icon.d) {
			icon.paths.push({
				d: icon.d,
			})
		}
		if (!icon.polygons) {
			icon.polygons = []
		}
		if (icon.points) {
			icon.polygons.push({
				points: icon.points,
			})
		}
		icons[name] = icon // eslint-disable-line no-param-reassign
	})
}
