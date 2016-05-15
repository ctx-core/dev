<ctx>
  <yield/>
  <style>
    ctx {
      display: block;
      overflow: hidden;
    }
  </style>
  <script type="text/babel">
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {keys} from "ctx-core/object/lib";
    const self = tag$assign__opts(this)
        , logPrefix = "ctx-core/dom/ctx.tag";
    let assign__publicKeys$;
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    console.log(logPrefix);
    function on$mount() {
      console.log(`${logPrefix}|on$mount`, opts);
      let ctx = self.ctx;
      if (!ctx.keys$public) {
        assign__publicKeys$ = true;
        ctx.keys$public = keys(ctx);
      }
    }
    function on$unmount() {
      console.log(`${logPrefix}|on$mount`);
      if (assign__publicKeys$) {
        delete ctx.keys$public;
      }
    }
  </script>
</ctx>