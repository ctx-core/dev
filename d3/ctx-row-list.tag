<ctx-row-list>
  <ctx-row-list-present show="{ctx && ctx.ctx_row$$filter$$.length}">
    <row
      each="{ctx_row in ctx.ctx_row$$filter$$}"
      class="{select: ctx_row.ctx_row_index === ctx.ctx_row_index}"
      onclick="{tag$row$onclick}"
      data-ctx-row-index="{ctx_row.ctx_row_index}"
    >{ctx_row.name}</row>
  </ctx-row-list-present>
  <ctx-row-list-blank show="{!(ctx && ctx.ctx_row$$filter$$.length)}">
    Loading&hellip;
  </ctx-row-list-blank>
  <style>
    ctx-row-list ctx-row-list-present row {
      display: block;
      padding: 2px;
      list-style-type: none;
      cursor: pointer;
    }
    ctx-row-list ctx-row-list-present row.select {
      background: #cccccc;
      font-weight: bold;
    }
    ctx-row-list ctx-row-list-blank {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {$$} from "ctx-core/dom/lib";
    import {tag$assign__opts} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {array$,array$map} from "ctx-core/array/lib";
    import dom$classes from "dom-classes";
    import {
      assign__ctx_row$$filter$$_agent,
      assign__ctx_row_index_agent,
      assign__ctx_row_index} from "ctx-core/table/lib";
    import {log,error,debug} from "ctx-core/logger/lib";
    const self = tag$assign__opts(this, {
            assign__ctx$update: assign__ctx$update,
            tag$row$onclick: tag$row$onclick
          })
        , logPrefix = "ctx-core/d3/ctx-row-list.tag";
    log(logPrefix);
    self.on("mount", on$mount);
    self.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = self.ctx;
      assign__ctx_row$$filter$$_agent(ctx);
      assign__ctx_row_index_agent(ctx);
      ctx.ctx_row$$filter$$_agent.on("change", ctx_row$$filter$$_agent$on$change);
      ctx.ctx_row_index_agent.on("change", ctx_row_index_agent$on$change);
      assign__ctx$update(ctx);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      let ctx = self.ctx;
      ctx.ctx_row$$filter$$_agent.off("change", ctx_row$$filter$$_agent$on$change);
      ctx.ctx_row_index_agent.off("change", ctx_row_index_agent$on$change);
    }
    function ctx_row$$filter$$_agent$on$change(ctx) {
      log(`${logPrefix}|ctx_row$$filter$$_agent$on$change`);
      assign__ctx$update(ctx);
    }
    function ctx_row_index_agent$on$change(ctx) {
      log(`${logPrefix}|ctx_row_index_agent$on$change`);
      assign__ctx$update(ctx);
    }
    function assign__ctx$update() {
      log(`${logPrefix}|assign__ctx$update`);
      let ctx = assign(self.ctx, ...arguments)
        , ctx_row_index = ctx.ctx_row_index;
      assign(self, {ctx: ctx});
      self$update();
      dom$row_data_ctx_row_index$$(ctx_row_index).forEach(
        dom$row_data_ctx_row_index =>
          dom$classes.add(dom$row_data_ctx_row_index, "highlight"));
    }
    function self$update() {
      log(`${logPrefix}|self$update`);
      self.update();
    }
    function tag$row$onclick(e) {
      log(`${logPrefix}|tag$row$onclick`);
      let ctx = self.ctx;
      const tag$row_list$target = e.target
          , ctx_row_index = parseInt(tag$row_list$target.getAttribute("data-ctx-row-index"));
      assign__ctx_row_index(ctx, {ctx_row_index: ctx_row_index});
    }
    function dom$row_data_ctx_row_index$$(ctx_row_index) {
      return array$($$(`row[data-ctx-row-index="${ctx_row_index}"]`));
    }
  </script>
</ctx-row-list>