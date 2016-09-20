<ctx-quartile-color-bar>
  <ul>
    <li
      each="{cell in cells()}"
      class="ctx-quartile-{cell$value(cell)}"
      title="{cell$title(cell)}"
    >
      {cell$value(cell)}
    </li>
  </ul>
  <style>
    .ctx-quartile-0 {
      background-color: #CCCCCC;
    }
    .ctx-quartile-1 {
      background-color: #33A532;
    }
    .ctx-quartile-2 {
      background-color: #AAD201;
    }
    .ctx-quartile-3 {
      background-color: #FAD201;
    }
    .ctx-quartile-4 {
      background-color: #CC0605;
    }
    ctx-quartile-color-bar {
      display: block;
    }
    ctx-quartile-color-bar ul {
      margin: 0;
      padding: 0;
      display: flex;
      width: 100%;
      list-style: none;
    }
    ctx-quartile-color-bar ul li {
      flex: 1;
      height: 1rem;
      width: auto;
      font-size: 1px;
      color: transparent;
      border-left: 2px solid #AAAAAA;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {assign,defaults} from 'ctx-core/object/lib'
    import {chunks} from 'ctx-core/array/lib'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            cells,
            cell$title,
            cell$value
          })
        , {
            agentkey
          , listkey
          , offsetskey} = tag.opts
        , logPrefix = 'ctx-core/quartile/ctx-quartile-color-bar.tag'
    log(logPrefix)
    let {ctx} = tag
    const agent = ctx[agentkey]
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      agent.on('change', on$change__agent)
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      agent.off('change', on$change__agent)
    }
    function on$change__agent() {
      log(`${logPrefix}|on$change__agent`)
      tag.update__ctx()
    }
    function cells() {
      const list = ctx[listkey] || []
          , offsets = ctx[offsetskey] || 0
      if (!list || !list.length) return []
      let cells__a = []
      const chunks$ = chunks(list, offsets.length)
      cells__a.push(...chunks$)
      return cells__a
    }
    function cell$value(cell) {
      const value__index = indices().value
      return cell[value__index] || '0'
    }
    function cell$title(cell) {
      const title__index = indices().title
      return cell[title__index] || `${cell$value(cell)}/4`
    }
    function indices() {
      log(`${logPrefix}|indices|!indices__o`)
      let indices__o = {}
      const offsets = ctx[offsetskey]
      for (let i = 0; i < offsets.length; i++) {
        const key = offsets[i]
        indices__o[key] = i
      }
      defaults(indices__o, {
        value: 0
      })
      return indices__o
    }
  </script>
</ctx-quartile-color-bar>