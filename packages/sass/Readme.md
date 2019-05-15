# @ctx-core/sass

Processes sass with postcss & global style support.

## Rollup Example

```javascript
// rollup.config.js
import svelte from 'rollup-plugin-svelte'
import { style } from '@ctx-core/sass/svelte'
module.exports = {
	client: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				preprocess: {
					style,
				}
			})
		]
	},
	server: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				preprocess: {
					style,
				}
			})
		]
	},
	// ...
}
```

## Svelte Component - `<style global>` Example

```html
<div class="my-global-class">✔</div>

<style global>
	.my-global-class {
		color: green;
	}
</style>
```
