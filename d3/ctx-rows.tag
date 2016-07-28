<ctx-rows>
  <ctx-rows-present show="{ctx && ctx.ctx_rows$filter.length}">
    <ctx-row
      each="{ctx_row in ctx.ctx_rows$filter}"
      class="{select: ctx_row.ctx_row_id === ctx.ctx_row_id}"
      onclick="{tag$row__onclick}"
      data-ctx-row-id="{ctx_row.ctx_row_id}"
    >{ctx_row.name}</ctx-row>
  </ctx-rows-present>
  <ctx-rows-blank show="{!(ctx && ctx.ctx_rows$filter.length)}">
    Loading&hellip;
  </ctx-rows-blank>
  <style>
    ctx-rows ctx-rows-present ctx-row {
      display: block;
      padding: 2px;
      list-style-type: none;
      cursor: pointer;
    }
    ctx-rows ctx-rows-present ctx-row.select {
      background: #cccccc;
      font-weight: bold;
    }
    ctx-rows ctx-rows-blank {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign,new__update__ctx} from "ctx-core/tag/lib";
    import {route} from "ctx-core/route/lib";
    import {array$from} from "ctx-core/array/lib";
    import {mount__table} from "ctx-core/table/tag";
    import {dom$$} from "ctx-core/dom/lib";
    import dom$classes from "ctx-core/dom-classes/lib";
    import {fn$log,log,debug} from "ctx-core/logger/lib";
    const update__ctx = new__update__ctx({after: assign__update$after})
        , tag = tag__assign(this, {
            update__ctx: update__ctx,
            tag$row__onclick: tag$row__onclick,
            registerElement: [
              "ctx-rows-present",
              "ctx-row",
              "ctx-rows-blank"]
          })
        , logPrefix = "ctx-core/d3/ctx-rows.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    mount__table(tag, {
      ctx_row_id__on$change: fn$log(tag.update__ctx, `${logPrefix}|ctx_row_id__on$change`),
      ctx_rows$filter__on$change: fn$log(tag.update__ctx, `${logPrefix}|ctx_rows$filter__on$change`)
    });
    function assign__update$after() {
      log(`${logPrefix}|assign__update$after`);
      let ctx_row_id = tag.ctx.ctx_row_id;
      dom$row_data_ctx_row_id$$(ctx_row_id).forEach(
        dom$row_data_ctx_row_id =>
          dom$classes.add(dom$row_data_ctx_row_id, "highlight"));
    }
    function tag$row__onclick(e) {
      log(`${logPrefix}|tag$row__onclick`);
      const tag$row_list$target = e.target
          , ctx_row_id = parseInt(tag$row_list$target.getAttribute("data-ctx-row-id"));
      route(ctx, `${ctx.route$path}?ctx_row_id=${encodeURIComponent(ctx_row_id)}`);
    }
    function dom$row_data_ctx_row_id$$(ctx_row_id) {
      return array$from(dom$$(`ctx-row[data-ctx-row-id="${ctx_row_id}"]`));
    }
  </script>
</ctx-rows>