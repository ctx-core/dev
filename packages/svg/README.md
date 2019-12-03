# @ctx-core/svg

Middleware, component, & utility functions for svg.

## Install

```shell
npm i @ctx-core/svg
```

## Svelte + Sapper Component

`@ctx-core/svg/svelte` has `_preprocess__svg`, which instantiates a rollup preprocess object.

```javascript
// rollup.config.js
require = require('esm')(module)
const { _preprocess } = require('@ctx-core/svelte/preprocess')
const { _preprocess__svg } = require('@ctx-core/svg/svelte')
const preprocess__svg = _preprocess__svg()
const preprocess = _preprocess([
	preprocess__svg,
	// ...
])
export default {
	client: {
		//...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.svg'],
				preprocess,
			}),
			// ...
		],
		// ...
	},
	server: {
		//...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.svg'],
				preprocess,
			}),
			// ...
		],
		// ...
	},
	serviceworker: {
		// ...
	},
}
```

Svg files can then be imported with optional attributes to be added to the `<svg>` tag.
Note that existing svg attributes in the source file will be the default values.

```html
<script>
	import My_Icon from './path/to/my-icon.svg'
</script>
<My_Icon fill="red"></My_Icon>

```

### How does this work?

The @ctx-core/svg preprocessor runs as a preprocess hook in `rollup-plugin-svelte`.
An imported svg file:

```svg
<svg viewBox="0 0 512 512" width="512" height="512">
  <path d="M480 288c0-80.25-49.28-148.92-119.19-177.62L320 192V80a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16v112l-40.81-81.62C81.28 139.08 32 207.75 32 288v64h448zm16 96H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h480a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
</svg>
```

Is preprocessed to a svelte component:

```html
<script context="module">
	export async function preload({ params, query }) {
	  return Object.assign({}, query, params)
	}
</script>
<script>
	let node__svg
	$: {
		Object.keys($$props).forEach(
			prop => node__svg && node__svg.setAttribute(prop, $$props[prop]))
	}
</script>
<svelte:options namespace="svg"></svelte:options>
<svg bind:this="{node__svg}" ${txt__attribs}><!--...--></svg>
```

## Middleware

`@ctx-core/svg/middleware` is an express middleware that responds with the svg file,
	applying optional url query attributes to the `<svg>` tag.
	
### Sapper route

The following route, `GET /icons/[name].svg`,
	will respond with a svg file in the `src/routes/icons` directory.
`GET /icons/[name].svg?fill=blue` will set the `fill=blue` attributes on the `<svg>` tag.

```javascript
// src/routes/icons/[name].svg.js
import { _get__svg } from '@ctx-core/svg/middleware'
export const get = _get__svg({ dir: 'src/routes/icons' })
```
