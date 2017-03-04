<ctx-color-bar>
  <ul class="data">
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
    class="labels {present: opts.labels}"
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
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , { agentkey } = tag.opts
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