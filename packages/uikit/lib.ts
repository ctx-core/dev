import boot from 'uikit/src/js/api/boot'
import UIkit from 'uikit/src/js/uikit-core'
export { UIkit }
let boot_called
function boot__uikit() {
	if (boot_called) return
	boot_called = true
	boot(UIkit)
}
type Opts__register__component = {
	force?:boolean
}
export function register__component(name, component, opts:Opts__register__component = {}) {
	boot__uikit()
  if (!UIkit[name] || opts.force) {
  	UIkit.component(name, component)
	}
}
