# @ctx-core/sass

Processes sass with postcss & global style support.

## Rollup Example

```javascript
// rollup.config.js
require = require('esm')(module)
import svelte from 'rollup-plugin-svelte'
import { _preprocess } from '@ctx-core/svelte/preprocess'
import { _preprocess__sass } from '@ctx-core/sass/svelte'
const preprocess__sass = _preprocess__sass()
const preprocess = _preprocess([
	preprocess__sass,
	// ...
])
module.exports = {
	client: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				preprocess,
			})
		]
	},
	server: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				preprocess,
			})
		]
	},
	// ...
}
```

## Svelte Component - `<style global>` Example

```html
<div class="container">
	<div class="my-global-class">✔</div>
</div>

<style type="text/scss" global>
	.container {
		.my-global-class {
			color: green;
		}
	}
</style>
```

The CSS equilavent is generated for Svelte:

```css
:global(.container .my-global-class) {
	color: green;	
}
```
