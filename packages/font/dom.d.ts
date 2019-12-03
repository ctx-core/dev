/**
 * The ctx for fit functions
 * @typedef {module:ctx-core/object/lib~ctx} ctx
 * @property {module:ctx-core/dom/lib~HTMLElement} container - The container HTMLElement
 * @property {module:ctx-core/dom/lib~HTMLElement} el - The el HTMLElement
 * @property {float} [step=0.1] - delta for each `fontSize` step
 * @property {integer} [max_iterations=100] - maximum number of iterations. warning if exceeded
 */
/**
 * Fit `ctx.el` inside of ``
 * @param {...module:ctx-core/object/lib~ctx} ctx__clone
 */
export declare function fit__downscale__fontSize(ctx: any): any;
