<ctx-size>
  <ctx-lte-960></ctx-lte-960>
  <ctx-gte-768></ctx-gte-768>
  <ctx-lte-650></ctx-lte-650>
  <ctx-lte-480></ctx-lte-480>
  <yield/>
  <style type="text/css">
    ctx-size {
      display: block;
    }
    ctx-size > * {
      display: none;
    }
    @media (max-width: 960px) {
      ctx-size > ctx-lte-960 {
        display: block;
      }
    }
    @media (min-width: 768px) {
      ctx-size > ctx-gte-768 {
        display: block;
      }
    }
    @media (max-width: 900px) {
      ctx-size > ctx-lte-650 {
        display: block;
      }
    }
    @media (max-width: 480px) {
      ctx-size > ctx-lte-480 {
        display: block;
      }
    }
  </style>
  <script type="text/ecmascript-6">
    import {init} from 'ctx-core/dom/ctx-size'
    init(this)
  </script>
</ctx-size>