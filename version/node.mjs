import env from 'ctx-core/version/env'
import {$version as $version__super} from 'ctx-core/version/lib'
export function $version() {
  return $version__super(env)
}