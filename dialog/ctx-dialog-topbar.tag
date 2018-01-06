<ctx-dialog-topbar class="topbar">
  <a class="back-button" href="#" onclick="{__click__back_button}"></a>
  <title class="{present: $ctx('dialog.title')}">&nbsp;{$ctx('dialog.title')}&nbsp;</title>
  <style type="text/css">
    ctx-dialog-topbar {
      display: block;
      height: 3rem;
      width: 100%;
      overflow: hidden;
      min-height: 1.25em;
      line-height: 1.25em;
      background: #222222;
      border-bottom: 1px dotted #000000;
      padding: 10px 0;
    }
    ctx-dialog-topbar > .back-button {
      display: block;
      float: right;
      width: 2em;
      padding: 0.25em 0;
      font-size: 18px;
      cursor: pointer;
    }
    ctx-dialog-topbar > .back-button::before {
      content: '';
      display: block;
      width: 2em;
      height: 1.3em;
      text-align: center;
    }
    ctx-dialog-topbar > title {
      display: none;
      padding: 0.25em 0;
      font-size: 18px;
      font-weight: bold;
    }
    ctx-dialog-topbar > title.present {
      display: block;
    }
    @media (max-width: 900px) {
      ctx-dialog-topbar {
        height: 3.2rem;
      }
      ctx-dialog-topbar > ctx-back-button {
        position: absolute;
        right: 0;
        float: none;
      }
      ctx-dialog-topbar > title {
        width: 100%;
        text-align: center;
      }
    }
  </style>
  <script type="buble">
    import {init} from 'dialog/ctx-dialog-topbar.mjs'
    init(this)
  </script>
</ctx-dialog-topbar>