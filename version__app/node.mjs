import env from 'ctx-core/version__app/env'
import {$version as $version__super} from 'ctx-core/version__app/lib'
export function $version() {
  return $version__super(env)
}