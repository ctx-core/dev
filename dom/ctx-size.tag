<ctx-size>
  <ctx-size-lte-960></ctx-size-lte-960>
  <ctx-size-lte-650></ctx-size-lte-650>
  <ctx-size-lte-480></ctx-size-lte-480>
  <yield/>
  <style>
    ctx-size {
      display: block;
    }
    ctx-size-lte-960,ctx-size-lte-650,ctx-size-lte-480 {
      display: none;
    }
    @media (max-width: 960px) {
      ctx-size-lte-960 {
        display: block;
      }
    }
    @media (max-width: 650px) {
      ctx-size-lte-650 {
        display: block;
      }
    }
    @media (max-width: 480px) {
      ctx-size-lte-480 {
        display: block;
      }
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {$} from "ctx-core/dom/lib";
    const self = tag$assign__opts(this)
        , dom$root = self.root
        , getComputedStyle = window.getComputedStyle
        , logPrefix = "ctx-core/dom/ctx-size.tag";
    let $isLte960, $isLte650, $isLte480;
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    console.log(logPrefix);
    function on$mount() {
      console.log(`${logPrefix}|on$mount`);
      $isLte960 = $("ctx-size-lte-960", dom$root);
      $isLte650 = $("ctx-size-lte-650", dom$root);
      $isLte480 = $("ctx-size-lte-480", dom$root);
      assign(self.ctx, {
        isLte960: isLte960,
        isLte650: isLte650,
        isLte480: isLte480
      });
    }
    function on$unmount() {
      console.log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      delete ctx.isLte480;
      delete ctx.isLte650;
      delete ctx.isLte960;
    }
    function isLte960() {
      console.log(`${logPrefix}|isLte960`);
      return getComputedStyle($isLte960).display === "block";
    }
    function isLte650() {
      console.log(`${logPrefix}|isLte650`);
      return getComputedStyle($isLte650).display === "block";
    }
    function isLte480() {
      console.log(`${logPrefix}|isLte480`);
      return getComputedStyle($isLte480).display === "block";
    }
  </script>
</ctx-size>