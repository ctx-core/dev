<ctx-dialog
	class="{className()}"
	onclick="{__click__root}">
	<section>
		<yield from="section" />
		<yield />
	</section>
	<style type="text/css">
		ctx-dialog {
			position: absolute;
			display: none;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.4);
			transition: all 0.3s ease;
		}
		ctx-dialog.show {
			display: -webkit-box;
			display: block;
		}
		ctx-dialog > section {
			position: absolute;
			display: block;
			overflow-y: hidden;
			width: 100%;
			height: 100%;
		}
		ctx-dialog > section > * {
			overflow: hidden;
			position: absolute;
			width: 60%;
			left: 50%;
			height: auto;
			margin-left: -30%;
			opacity: 1.0;
			transition: all 0.3s ease;
		}
		ctx-dialog > section > :not(.show) {
			display: none;
		}
		ctx-dialog > section > * > section {
			display: block;
			overflow: hidden;
			background: #ffffff;
			border: 1px dotted #000000;
		}
		/* .dialog-center */
		ctx-dialog > section > .dialog-center > .topbar > .back-button {
			float: right;
		}
		ctx-dialog > section > .dialog-center > .topbar > .back-button::before {
			content: "\2715";
		}
		@media (max-width: 900px) {
			ctx-dialog > section {
				width: 100%;
				left: 0;
				margin: 0;
			}
		}
		/* .dialog-right */
		ctx-dialog > section > .dialog-right {
			width: 30%;
			height: 100%;
			left: auto;
			right: 0;
		}
		ctx-dialog > section > .dialog-right > .topbar > title {
			float: right;
			text-align: right;
		}
		ctx-dialog > section > .dialog-right > .topbar > .back-button {
			float: left;
		}
		ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
			content: "\02192";
		}
		ctx-dialog.hide__inProgress > section > .dialog-right > .topbar > .back-button::before {
			content: "\02190";
		}
		ctx-dialog > section > .dialog-right > section {
			height: calc(100% - 3rem);
		}
		@media (max-width: 900px) {
			ctx-dialog > section > .dialog-right > .topbar > title {
				float: none;
				text-align: center;
			}
			ctx-dialog > section > .dialog-right > .topbar > .back-button {
				float: right;
			}
			ctx-dialog > section > .dialog-right > .topbar > .back-button::before {
				content: "\2715";
			}
			ctx-dialog.hide__inProgress > section > .dialog-right > .topbar > .back-button::before {
				content: "\2715";
			}
			ctx-dialog > section > .dialog-right > section {
				height: auto;
			}
		}
	</style>
	<script>
		import {init} from 'ctx-core/dialog/ctx-dialog.mjs'
		init(this)
	</script>
</ctx-dialog>