<ctx-quartile-color-bar>
  <ul>
    <li
      each="{issue_id in opts.order}"
      class="ctx-quartile-{parent.opts.values[issue_id]}"
      title="{parent.opts.titles[issue_id]}"
      riot-style="flex: {parent.opts.weights[issue_id]};"
    >
      {parent.opts.values[issue_id]}
    </li>
  </ul>
  <ul class="{present: opts.showlabels}">
    <li
      each="{issue_id in opts.order}"
      class="label"
      title="{parent.opts.titles[issue_id]}"
      riot-style="flex: {parent.opts.weights[issue_id]};"
    >
      {parent.opts.titles[issue_id]}
    </li>
  </ul>
  <style type="text/css">
    ctx-quartile-color-bar {
      box-sizing: border-box;
      display: block;
    }
    ctx-quartile-color-bar * {
      box-sizing: border-box;
    }
    ctx-quartile-color-bar ul {
      display: none;
      height: 1rem;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      -webkit-box-align: center;
      -webkit-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-flex-pack: center;
      justify-content: center;
      text-align: center;
      list-style: none;
    }
    ctx-quartile-color-bar ul.present {
      display: flex;
    }
    ctx-quartile-color-bar ul li {
      overflow: hidden;
      flex: 1;
      height: 1rem;
      font-size: 1rem;
      line-height: 1.2rem;
      width: auto;
      color: transparent;
      border-left: 2px solid #FFF;
    }
    ctx-quartile-color-bar ul > li:first-of-type {
      border-left-color: #666666;
    }
    ctx-quartile-color-bar ul li.label {
      color: #000000;
    }
  </style>
  <script type="buble">
    import {init} from 'ctx-core/color-bar/ctx-quartile-color-bar.mjs'
    init(this)
  </script>
</ctx-quartile-color-bar>