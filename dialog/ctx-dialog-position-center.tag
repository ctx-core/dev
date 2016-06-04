<ctx-dialog-position-center>
  <style>
    ctx-dialog-position-center {
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
    ctx-dialog > dialog > topbar {
      padding-left: 4px;
    }
    ctx-dialog > dialog > topbar > back-button {
      float: left;
    }
    ctx-dialog > dialog > topbar > back-button:before {
      content: "\2716";
    }
  </style>
</ctx-dialog-position-center>