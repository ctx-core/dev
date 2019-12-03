<script>
export let corner = false
</script>

<div class="Ribbon" class:corner="{corner}">
	<slot></slot>
</div>

<style type="text/scss">
.Ribbon {
	width: 100%;
	height: 3.54em;
	position: fixed;
	overflow: hidden;
	bottom: 0;
	left: 0;
	z-index: 9999;
	pointer-events: none;
	font-size: 1rem;
	text-decoration: none;
	text-indent: -999999px;
	&:before, &:after {
		position: absolute;
		display: block;
		width: 100%;
		height: 3.54em;
		bottom: 0;
		left: 0;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
	}
	&:before {
		content: "";
		padding: .38em 0;
		background-color: #33D18D;
		background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.15)));
		background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
		background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
		background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
		background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
		-webkit-box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
		-moz-box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
		box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
		pointer-events: auto;
	}
	&:hover:before {
		background-color: #3BEFA2;
	}
	&:after {
		content: attr(title);
		color: #fff;
		font-family: "NeuzeitGro-Bla", Helvetica, Arial, sans-serif;
		letter-spacing: -0.01192307692em;
		line-height: 1em;
		text-decoration: none;
		text-shadow: 0 -.08em rgba(0, 0, 0, 0.2);
		text-align: center;
		text-indent: 0;
		margin: -1em 0;
	}
	&.corner {
		width: 16.1em;
		height: 16.1em;
		bottom: auto;
		top: 0;
		left: auto;
		right: 0;
		&:before, &:after {
			width: 30.38em;
			height: 2.54em;
			top: 4.23em;
			left: auto;
			right: -8.23em;
			-webkit-transform: rotate(45deg);
			-moz-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			-o-transform: rotate(45deg);
			transform: rotate(45deg);
			line-height: 1.6em;
		}
		&:after {
			margin: 1.1em 0;
		}
	}
}
</style>
