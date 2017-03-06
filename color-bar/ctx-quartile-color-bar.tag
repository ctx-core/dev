<ctx-quartile-color-bar>
  <ul>
    <li
      each="{key in opts.order}"
      class="ctx-quartile-{parent.opts.values[key]}"
      title="{parent.opts.titles[key]}"
      riot-style="flex: {parent.opts.weights[key]};"
    >
      {parent.opts.values[key]}
    </li>
  </ul>
  <ul class="{present: opts.showlabels}">
    <li
      each="{key in opts.order}"
      class="label"
      title="{parent.opts.titles[key]}"
      riot-style="flex: {parent.opts.weights[key]};"
    >
      {parent.opts.titles[key]}
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
  <script type="text/ecmascript-6">
    import {init} from 'ctx-core/color-bar/ctx-quartile-color-bar'
    init(this)
  </script>
</ctx-quartile-color-bar>