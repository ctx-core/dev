<ctx-dialog-position-right>
	<style type="text/css">
		ctx-dialog-position-right {
			display: none;
		}
		ctx-dialog {
		}
		ctx-dialog > section {
			width: 30%;
			height: 100%;
			left: auto;
			right: 0;
		}
		ctx-dialog > section > * {
			height: 100%;
		}
		ctx-dialog > section > * > .topbar > title {
			float: right;
			text-align: right;
		}
		ctx-dialog > section > * > .topbar > .back-button {
			float: left;
		}
		ctx-dialog > section > * > .topbar > .back-button::before {
			content: "\02192";
		}
		ctx-dialog.start > section > * > .topbar > .back-button::before {
			content: "\02190";
		}
		ctx-dialog > section > * > section {
			height: calc(100% - 3rem);
		}
		@media (max-width: 900px) {
			ctx-dialog > section {
				width: 100%;
				right: auto;
			}
			ctx-dialog > section > * > .topbar > title {
				float: none;
				text-align: center;
			}
			ctx-dialog > section > * > .topbar > .back-button {
				float: right;
			}
			ctx-dialog > section > * > .topbar > .back-button::before {
				content: "\2715";
			}
			ctx-dialog.start > section > * > .topbar > .back-button::before {
				content: "\2715";
			}
			ctx-dialog > section > * > section {
				height: auto;
			}
		}
	</style>
</ctx-dialog-position-right>