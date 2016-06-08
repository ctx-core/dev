<ctx-dialog-position-right>
  <style>
    ctx-dialog-position-right {
      display: none;
    }
    ctx-dialog {
    }
    ctx-dialog > content {
      width: 30%;
      height: 100%;
      left: auto;
      right: 0;
    }
    ctx-dialog > content > * {
      height: 100%;
    }
    ctx-dialog > content > * > .topbar > title {
      float: right;
      text-align: right;
    }
    ctx-dialog > content > * > .topbar > back-button {
      float: left;
    }
    ctx-dialog > content > * > .topbar > back-button::before {
      content: "\02192";
    }
    ctx-dialog.start > content > * > .topbar > back-button::before {
      content: "\02190";
    }
    ctx-dialog > content > * > content {
      height: calc(100% - 3rem);
    }
    @media (max-width: 900px) {
      ctx-dialog > content {
        width: 100%;
        right: auto;
      }
      ctx-dialog > content > * > .topbar > title {
        float: none;
        text-align: center;
      }
      ctx-dialog > content > * > .topbar > back-button {
        float: right;
      }
      ctx-dialog > content > * > .topbar > back-button::before {
        content: "\2716";
      }
      ctx-dialog.start > content > * > .topbar > back-button::before {
        content: "\2716";
      }
      ctx-dialog > content > * > content {
        height: auto;
      }
    }
  </style>
</ctx-dialog-position-right>