import { _no__dom } from '@ctx-core/dom'
export default (
	_no__dom()
	? require('isomorphic-fetch')
	: window.fetch
) as (input:RequestInfo, init?:RequestInit)=>Promise<Response>
export const Headers:Headers = _no__dom() ? require('isomorphic-fetch').Headers : window.Headers
export const Request:Request = _no__dom() ? require('isomorphic-fetch').Request : window.Request
export const Response:Response = _no__dom() ? require('isomorphic-fetch').Response : window.Response
