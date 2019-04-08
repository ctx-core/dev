# @ctx-core/instagram_cache

Caches the paths to the media in an instagram account to S3.

Also contains a `Gallery__Instagram` svelte component to navigate through the media.

## Usage

###  `cache-instagram.js`

```shell
npm install @ctx-core/instagram_cache
cache-instagram.js
```

### Gallery__Instagram

```html
<script>
	import Gallery__Instagram from '@ctx-core/instagram_cache/Gallery__Instagram.html'
</script>

<Gallery__Instagram></Gallery__Instagram>
```

## Environment Variables

`INSTAGRAM_NAME` -
	Name of the instagram account

`KEY__ARR__PATHNAME__MEDIUM` -
	S3 Key for the file containing the Array of Paths of Media
