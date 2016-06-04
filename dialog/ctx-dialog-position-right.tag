<ctx-dialog-position-right>
  <style>
    ctx-dialog-position-right {
      display: none;
    }
    ctx-dialog {
      align-items: flex-end;
      justify-content: flex-end;
    }
    ctx-dialog > content {
      width: 400px;
    }
    ctx-dialog > content > * {
      flex: auto;
    }
    ctx-dialog > content > * > .topbar {
      flex-direction: row-reverse;
    }
    ctx-dialog > content > * > .topbar > title {
      float: right;
      text-align: right;
      font-size: 24px;
    }
    ctx-dialog > content > * > .topbar > back-button {
      float: left;
    }
    ctx-dialog > content > * > .topbar > back-button:before {
      content: "\02192";
    }
    ctx-dialog.start > content > * > .topbar > back-button:before {
      content: "\02190";
    }
    ctx-dialog > content > * > content {
      flex: auto;
    }
  </style>
</ctx-dialog-position-right>