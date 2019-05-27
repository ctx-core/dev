# @ctx-core/etsy_cache

Caches the listings in a Etsy Store to S3.

Also contains a `Store__Etsy` component to browse through store & to purchase a listing through Etsy.

## Usage

### `cache-etsy.js`

```shell
npm install @ctx-core/etsy_cache
cache-etsy.js
```

### Store__Etsy

```html
<script>
	import Store__Etsy from '@ctx-core/etsy_cache/Store__Etsy.svelte'
</script>

<Store__Etsy></Store__Etsy>

<style type="text/scss">
	@import "~@ctx-core/etsy_cache/Store__Etsy";
	@import "your-css/variables";
	@include Store__Etsy($min-width__multi_column: $width__desktop-max);
</style>
```

## Environment Variables

`ETSY_API_KEY`

`ETSY_API_SECRET`

`ETSY_STORE_ID`

`KEY__A1__LISTING__ETSY` -
	S3 Key for the json file containing the Array of Listings

`KEY__A1__IMAGES__LISTING__ETSY` -
	S3 Key for the json file containing the Array of images for the listings
