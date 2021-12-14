<script lang="ts">
import type { s3_etsy_listing_a$_T, s3_etsy_listing_image_a$_T } from '@ctx-core/etsy_cache'
import { s3_etsy_listing_a$_b, s3_etsy_listing_image_a$_b } from '@ctx-core/etsy_cache'
export let ctx
const s3_etsy_listing_a$:s3_etsy_listing_a$_T = s3_etsy_listing_a$_b(ctx)
const s3_etsy_listing_image_a$:s3_etsy_listing_image_a$_T = s3_etsy_listing_image_a$_b(ctx)
</script>

<div class="Etsy_Store">
	{#each $s3_etsy_listing_a$||[] as s3_etsy_listing, i}
		<div class="listing" title="{s3_etsy_listing.description}">
			<div class="img-container">
				{#if $s3_etsy_listing_image_a$[i].url_75x75}
					<img
						src="{$s3_etsy_listing_image_a$[i].url_75x75}"
						alt="{s3_etsy_listing.description}"
					>
				{/if}
			</div>
			<div class="title">{@html s3_etsy_listing.title}</div>
			<div class="price">{s3_etsy_listing.price}</div>
			<a href="{s3_etsy_listing.url}" class="buy" target="_blank">Buy on Etsy</a>
		</div>
	{/each}
</div>

