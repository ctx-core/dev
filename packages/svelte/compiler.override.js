// TODO: Delete this file when https://github.com/sveltejs/svelte/issues/2139 is resolved
/**
 * In svelte/compiler.js, add before
 *
 * if (variable)
 *   variable.subscribable = true;
 */
// Replace
variable.subscribable = true
// With
if (variable)
	variable.subscribable = true
