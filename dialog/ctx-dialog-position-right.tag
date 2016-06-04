<ctx-dialog-position-right>
  <style>
    ctx-dialog-position-right {
      display: none;
    }
    ctx-dialog > content {
      left: 100%;
      height: 100%;
      width: 400px;
    }
    ctx-dialog.start > mask {
      background: none;
      opacity: 1.0;
    }
    ctx-dialog.start > content {
      left: calc(100% - 400px);
    }
    ctx-dialog > content > * > ctx-dialog-topbar {
      flex-direction: row-reverse;
    }
    ctx-dialog > content > * > ctx-dialog-topbar > title {
      float: right;
      text-align: right;
      font-size: 24px;
    }
    ctx-dialog > content > * > ctx-dialog-topbar > back-button {
      float: left;
    }
    ctx-dialog > content > * > ctx-dialog-topbar > back-button:before {
      content: "\02192";
    }
    ctx-dialog.start > content > * > ctx-dialog-topbar > back-button:before {
      content: "\02190";
    }
  </style>
</ctx-dialog-position-right>