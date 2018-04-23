import env from 'ctx-core/version__app/env.mjs'
import {$version as $version__super} from 'ctx-core/version__app/lib.mjs'
export function $version() {
  return $version__super(env)
}