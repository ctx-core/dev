import { _version__papaparse } from './lib'
export const PAPAPARSE__URL =
	process.env.PAPAPARSE__URL
	|| `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${_version__papaparse()}/papaparse.js`
