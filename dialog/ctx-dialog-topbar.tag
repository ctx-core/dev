<ctx-dialog-topbar>
  <back-button onclick="{back_button$onclick}"></back-button>
  <title show="{dialog.title}">{dialog.title}</title>
  <style>
    ctx-dialog-topbar {
      display: block;
      width: 100%;
      overflow: hidden;
      line-height: 1.25em;
      background: #efefef;
      border-bottom: 1px dotted #111111;
      clear: both;
      padding: 10px 20px;
    }
    ctx-dialog-topbar > back-button {
      float: left;
      width: 30px;
      padding: 0 10px;
      cursor: pointer;
    }
    ctx-dialog-topbar > title {
      display: block;
      float: right;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</ctx-dialog-topbar>