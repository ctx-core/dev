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
  <ul show="{opts.showlabels}">
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
      display: flex;
      height: 1rem;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      text-align: center;
      list-style: none;
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
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , {opts} = tag
        , { agentkey } = opts
        , logPrefix = 'ctx-core/color-bar/ctx-quartile-color-bar.tag'
    log(logPrefix)
    let {ctx} = tag
    const agent = agentkey && ctx[agentkey]
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      if (agent) agent.on('change', on$change__agent)
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      if (agent) agent.off('change', on$change__agent)
    }
    function on$change__agent() {
      log(`${logPrefix}|on$change__agent`)
      tag.update__ctx()
    }
  </script>
</ctx-quartile-color-bar>