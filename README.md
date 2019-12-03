# @ctx-core/markdown

## Install

`npm i @ctx-core/markdown`

## Svelte Markdown markup preprocessor

```javascript
// rollup.config.js
require = require('esm')(module)
import svelte from 'rollup-plugin-svelte'
import { _preprocess } from '@ctx-core/svelte/preprocess'
import { _preprocess__markdown } from '@ctx-core/markdown/svelte'
const preprocess__markdown = _preprocess__markdown()
const preprocess = _preprocess([
	preprocess__markdown,
	// ...
])
module.exports = {
	client: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.md'],
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
				extensions: ['.svelte', '.html', '.md'],
				preprocess,
			})
		]
	},
	// ...
}
```

Now you can import *.md files as svelte components.

````markdown
```js exec
	let name = 'world';

```

# Hello {name}!
````

The preprocesser converts then converts the markdown to a svelte component.

## Frontmatter & __frontmatter store

The component sets the `__frontmatter` store object with the markdown front matter.

````markdown
---
title: My Blog Post
author: Me!
date: 12-31-1999
---
```js exec
	let name = 'world';
```

# {$__frontmatter.title}

*By {$__frontmatter.author} — {$__frontmatter.date}*

Hello {name}
````

## Sapper _layout.svelte

You can also utilize `$__frontmatter` in your `_layout.svelte` file.
Note that order of operations means the initial value of `$__frontmatter` will be `undefined`.

```html
<script>
	$: title = ($__frontmatter && $__frontmatter.title) || '' 
	$: author = ($__frontmatter && $__frontmatter.author) || '' 
	$: date = ($__frontmatter && $__frontmatter.date) || '' 
</script>
<h1>{title}</h1>

<p><em>By {author}</em> — {date}</p>

<slot></slot>
```
