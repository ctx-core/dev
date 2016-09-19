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
            cell$value,
            indices
          })
        , logPrefix = 'ctx-core/quartile/ctx-quartile-color-bar.tag'
    log(logPrefix)
    let cells__a, indices__o
    function cells() {
      if (!cells__a) {
        log(`${logPrefix}|cells|!cells__a`)
        cells__a = []
        const {list, offsets} = tag.opts
            , chunks$ = chunks(list, offsets.length)
        cells__a.push(...chunks$)
      }
      return cells__a
    }
    function indices() {
      if (!indices__o) {
        log(`${logPrefix}|indices|!indices__o`)
        indices__o = {}
        const {offsets} = tag.opts
        for (let i = 0; i < offsets.length; i++) {
          const key = offsets[i]
          indices__o[key] = i
        }
        defaults(indices__o, {
          value: 0
        })
      }
      return indices__o
    }
    function cell$value(cell) {
      const value__index = indices().value
      return cell[value__index] || '0'
    }
    function cell$title(cell) {
      const title__index = indices().title
      return cell[title__index] || `${cell$value(cell)}/4`
    }
  </script>
</ctx-quartile-color-bar>