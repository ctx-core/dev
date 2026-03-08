import type { ctx__be_T, ctx__get_T, ctx__set_T, sig_T } from 'ctx-core/rmemo'
import type { Context } from 'hono'
export declare const hono_context$_:ctx__be_T<sig_T<Context|undefined>, 'request'>
export declare const hono_context_:ctx__get_T<Context|undefined, 'request'>
export declare const hono_context__set:ctx__set_T<Context|undefined, 'request'>
export declare const request$_:ctx__be_T<sig_T<Request|undefined>, 'request'>
export declare const request_:ctx__get_T<Request|undefined, 'request'>
export declare const request_url$_:ctx__be_T<sig_T<URL|undefined>, 'request'>
export declare const request_url_:ctx__get_T<URL|undefined, 'request'>
