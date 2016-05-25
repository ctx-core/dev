<ctx-dialog-center>
  <style>
    ctx-dialog-center {
      display: none;
    }
    ctx-dialog {
      justify-content: center;
    }
    ctx-dialog > dialog {
      display: none;
      transition: none;
    }
    ctx-dialog.start > dialog {
      display: block;
    }
    ctx-dialog > dialog > top {
      padding-left: 4px;
    }
    ctx-dialog > dialog > top > back-button {
      float: left;
    }
    ctx-dialog > dialog > top > back-button:before {
      content: "\2716";
    }
  </style>
</ctx-dialog-center>