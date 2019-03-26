import '@ctx-core/env/env'
import { log, debug } from '@ctx-core/logger'
export const TMP_DIR = process.env.TMP_DIR || `${process.env.PWD}/tmp`
const logPrefix = '@ctx-core/dir/env.js'
log(logPrefix)
