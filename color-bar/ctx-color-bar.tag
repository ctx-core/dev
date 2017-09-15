<ctx-color-bar>
  <ul class="data">
    <li
      each="{key in opts.order}"
      class="{parent.opts.classes[$chain(parent, 'opts.values', key)]}"
      title="{$chain(parent, 'opts.titles', key)}"
      riot-style="{
       '-webkit-box-flex': $chain(parent, 'opts.weights', key),
        flex: $chain(parent, 'opts.weights', key)
      }"
    >
      {$chain(parent, 'opts.representations', key)}
    </li>
  </ul>
  <ul
    class="labels {present: opts.labels}"
  >
    <li
      each="{key in opts.order}"
      class="label"
      title="{$chain(parent, 'opts.titles', key)}"
      riot-style="{
       '-webkit-box-flex': $chain(parent, 'opts.weights', key),
        flex: $chain(parent, 'opts.weights', key)
      }"
    >
      <div>{$chain(parent, 'opts.labels', key)}</div>
    </li>
  </ul>
  <script type="buble">
    import {init} from 'ctx-core/color-bar/ctx-color-bar.mjs'
    init(this)
  </script>
</ctx-color-bar>