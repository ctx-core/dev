# @ctx-core/carousel

## Install

`npm i @ctx-core/carousel`

## Usage

```html
<script>
	import Carousel from '@ctx-core/carousel'
</script>

<Carousel>
	<div class="slide slide-1">
		<h1>Slide 1</h1>	
	</div>
	<div class="slide slide-2">
		<h1>Slide 2</h1>	
	</div>
	<div class="slide slide-3">
		<h1>Slide 3</h1>	
	</div>
</Carousel>

<style>
	.slide {
		background-size: cover;
	}
	.slide-1 {
		background-image: url(https://images.unsplash.com/photo-1517770317945-aa2dd9c9306f);
	}
	.slide-2 {
		background-image: url(https://images.unsplash.com/photo-1556023176-4b9ee95cfe9b);
	}
	.slide-3 {
		background-image: url(https://images.unsplash.com/photo-1555999003-3f2bc447570e);	
	}
</style>
```

## Styling

This Carousel is a simple left/right carousel.
The slide styling is left up to you.

You can override:

* `:global(.Carousel .button)`
* `:global(.Carousel .button:hover)`
* `:global(.Carousel .button.prev)`
* `:global(.Carousel .button.next)`
* `:global(.Carousel svg)`
