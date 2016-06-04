<ctx-dialog-position-center>
  <style>
    ctx-dialog-position-center {
      display: none;
    }
    ctx-dialog {
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      justify-content: center;
    }
    ctx-dialog > content {
      display: none;
      transition: none;
    }
    ctx-dialog.start > content {
      display: -webkit-box;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
    }
    ctx-dialog > content > * > .topbar > back-button {
      float: right;
    }
    ctx-dialog > content > * > .topbar > back-button:before {
      content: "\2716";
    }
  </style>
</ctx-dialog-position-center>