<ctx-quartile-color-bar>
  <ul>
    <li
      each="{cell, i in opts.cells}"
      class="quartile-{cell$text(cell)}"
      title="{cell$text(cell)}/4"
    >
      {cell$text(cell)}
    </li>
  </ul>
  <style>
    .quartile-0 {
      background-color: #CCCCCC;
    }
    .quartile-1 {
      background-color: #33A532;
    }
    .quartile-2 {
      background-color: #AAD201;
    }
    .quartile-3 {
      background-color: #FAD201;
    }
    .quartile-4 {
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
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            cell$text
          })
        , logPrefix = 'ctx-core/quartile/ctx-quartile-color-bar.tag'
    log(logPrefix)
    function cell$text(cell) {
      log(`${logPrefix}|cell$text`)
      return cell || '0'
    }
  </script>
</ctx-quartile-color-bar>