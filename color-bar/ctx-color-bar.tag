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
  <script type="buble">
    import {init} from 'ctx-core/color-bar/ctx-color-bar'
    init(this)
  </script>
</ctx-color-bar>