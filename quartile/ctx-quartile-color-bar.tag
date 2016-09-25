<ctx-quartile-color-bar>
  <ul>
    <li
      each="{cell in cells()}"
      class="ctx-quartile-{value__cell(cell)}"
      title="{title__cell(cell)}"
      riot-style="flex: {offset$weight__cell(cell)};"
    >
      {value__cell(cell)}
    </li>
  </ul>
  <ul show="{opts.showlabels}">
    <li
      each="{cell in cells()}"
      class="label"
      title="{title__cell(cell)}"
      riot-style="flex: {offset$weight__cell(cell)};"
    >
      {title__cell(cell)}
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
      box-sizing: border-box;
      display: block;
    }
    ctx-quartile-color-bar * {
      box-sizing: border-box;
    }
    ctx-quartile-color-bar ul {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
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
      border-left: 2px solid #AAAAAA;
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
    import {assign,defaults} from 'ctx-core/object/lib'
    import {chunks} from 'ctx-core/array/lib'
    import {avg} from 'ctx-core/math/lib'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            cells,
            title__cell,
            value__cell,
            offset$weight__cell
          })
        , { agentkey
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
    let cells__a
    function cells() {
      const list = ctx[listkey]
      if (!list || !list.length) return []
      const offsets = ctx[offsetskey] || 0
      cells__a = []
      const chunks$ = chunks(list, offsets.length)
      cells__a.push(...chunks$)
      return cells__a
    }
    function value__cell(cell) {
      const value__index = indices().value
      return cell[value__index] || '0'
    }
    function title__cell(cell) {
      const title__index = indices().title
      return cell[title__index] || `${value__cell(cell)}/4`
    }
    function offset$weight__cell(cell) {
      const offset$weight__index = indices().offset$weight
      return offset$weight__index
              ? cell[offset$weight__index]
              : 1
    }
    let indices__o
    function indices() {
      if (indices__o) return indices__o
      indices__o = {}
      const offsets = ctx[offsetskey]
      for (let i=0; i < offsets.length; i++) {
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