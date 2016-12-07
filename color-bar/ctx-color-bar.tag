<ctx-color-bar>
  <ul>
    <li
      each="{key in opts.order}"
      class="{parent.opts.classes[parent.opts.values[key]]}"
      title="{parent.opts.titles[key]}"
      riot-style="{
       '-webkit-box-flex': parent.opts.weights[key],
        flex: parent.opts.weights[key]
      }"
    >
      {parent.opts.representations[key]}
    </li>
  </ul>
  <ul
    show="{opts.labels}"
    class="labels"
  >
    <li
      each="{key in opts.order}"
      class="label"
      title="{parent.opts.titles[key]}"
      riot-style="{
       '-webkit-box-flex': parent.opts.weights[key],
        flex: parent.opts.weights[key]
      }"
    >
      <div>{parent.opts.labels[key]}</div>
    </li>
  </ul>
  <style type="text/css">
    ctx-color-bar {
      box-sizing: border-box;
      display: block;
    }
    ctx-color-bar * {
      box-sizing: border-box;
    }
    ctx-color-bar ul {
      display: -webkit-box;
      display: flex;
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
    ctx-color-bar ul li {
      -webkit-box-flex: 1;
      flex: 1;
      height: 1rem;
      font-size: 1rem;
      line-height: 1rem;
      padding-top: 0.05em;
      width: auto;
      color: white;
      border-left: 2px solid #FFF;
    }
    ctx-color-bar ul li.label {
      position: relative;
      color: #000000;
      font-weight: normal;
    }
    ctx-color-bar ul li.label > div {
      position: absolute;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      -webkit-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-flex-pack: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      white-space: nowrap;
    }
  </style>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , {opts} = tag
        , { agentkey } = opts
        , logPrefix = 'ctx-core/color-bar/ctx-color-bar.tag'
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
</ctx-color-bar>