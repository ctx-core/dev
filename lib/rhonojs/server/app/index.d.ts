import type { ctx__be_T, ctx__get_T, ctx__set_T, sig_T } from 'ctx-core/rmemo'
import type { Hono } from 'hono'
export declare const app$_:ctx__be_T<sig_T<Hono|undefined>, 'app'>
export declare const app_:ctx__get_T<Hono|undefined, 'app'>
export declare const app__set:ctx__set_T<Hono|undefined, 'app'>
export declare const server_entry__relative_path$_:ctx__be_T<sig_T<string|undefined>, 'app'>
export declare const server_entry__relative_path_:ctx__get_T<string|undefined, 'app'>
export declare const server_entry__output__relative_path$_:ctx__be_T<sig_T<string|undefined>, 'app'>
export declare const server_entry__output__relative_path_:ctx__get_T<string|undefined, 'app'>
export declare const server_entry__output__path$_:ctx__be_T<sig_T<string|undefined>, 'app'>
export declare const server_entry__output__path_:ctx__get_T<string|undefined, 'app'>
export declare const server_entry__output__link__path$_:ctx__be_T<sig_T<string|undefined>, 'app'>
export declare const server_entry__output__link__path_:ctx__get_T<string|undefined, 'app'>
export declare function app__attach(app?:Hono):Promise<Hono>
export declare function app__start(app?:Hono):Promise<Hono>
