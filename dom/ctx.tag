<ctx>
  <yield/>
  <style>
    ctx {
      display: none;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {keys} from "ctx-core/object/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/dom/ctx.tag";
    let assign__publicKeys$;
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    console.log(logPrefix);
    function on$mount() {
      console.log(`${logPrefix}|on$mount`, opts);
      let ctx = tag.ctx;
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