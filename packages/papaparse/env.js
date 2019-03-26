import { _version__papaparse } from './lib'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/papaparse/env.js'
log(logPrefix)
export const PAPAPARSE__URL =
	process.env.PAPAPARSE__URL
	|| `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${_version__papaparse()}/papaparse.js`
