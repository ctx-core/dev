export const icons = {}
export function get__icon(key__icon) {
  return icons[key__icon]
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
export function register__chevron_down_solid() {
	if (icons['chevron-down-solid']) return
	register__icon({ 'chevron-down-solid': { width: 448, height: 512, paths: [{ d: 'M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z' }] } })
}
export function register__chevron_left_solid() {
	if (icons['chevron-left-solid']) return
	register__icon({ 'chevron-left-solid': { width: 320, height: 512, paths: [{ d: 'M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z' }] } })
}
export function register__chevron_right_solid() {
	if (icons['chevron-right-solid']) return
	register__icon({ 'chevron-right-solid': { width: 320, height: 512, paths: [{ d: 'M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z' }] } })
}
export function register__chevron_up_solid() {
	if (icons['chevron-up-solid']) return
	register__icon({ 'chevron-up-solid': { width: 448, height: 512, paths: [{ d: 'M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z' }] } })
}
export function register__cloud_upload_solid() {
	if (icons['cloud-upload-solid']) return
	register__icon({ 'cloud-upload-solid': { width: 640, height: 512, paths: [{ d: 'M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-139.9 63.7l-10.8 10.8c-9.6 9.6-25.2 9.3-34.5-.5L320 266.1V392c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V266.1l-32.4 34.5c-9.3 9.9-24.9 10.1-34.5.5l-10.8-10.8c-9.4-9.4-9.4-24.6 0-33.9l92.7-92.7c9.4-9.4 24.6-9.4 33.9 0l92.7 92.7c9.4 9.4 9.4 24.6.1 33.9z' }] } })
}
