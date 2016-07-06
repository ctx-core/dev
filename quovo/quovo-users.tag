<quovo-users class="{loading: !ctx.quovo$user$$}">
  <a href="quovo/users/{id}"
     class="{
      selected-maybe: true,
      selected: id == ctx.quovo$user$id}"
     each="{ctx.quovo$user$$}"
     onclick="{app__link$onclick}">
    <quovo-user>
      <quovo-user-id>{id}</quovo-user-id>
      <quovo-user-username>{username}</quovo-user-username>
      <quovo-user-email>{email}</quovo-user-email>
      <quovo-user-value>{currency$format(this)}</quovo-user-value>
    </quovo-user>
  </a>
  <style>
    quovo-users {
      display: block;
      border: 1px dotted gray;
    }
    quovo-users .loading:before {
      padding: 10px 0;
    }
    quovo-users a {
      display: block;
      padding: 10px;
      color: #333333;
      text-decoration: none;
      border: 1px dotted gray;
    }
    quovo-users a > * {
      display: block;
    }
    quovo-users a > * > * {
      display: block;
      overflow: hidden;
      height: 1.25em;
      line-height: 1.25;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {
      assign__agent__quovo$user$$,
      assign__agent__quovo$user$id} from "ctx-core/quovo/agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            currency$format: currency$format,
            registerElement: [
              "quovo-user",
              "quovo-user-id",
              "quovo-user-username",
              "quovo-user-email",
              "quovo-user-value"]})
        , logPrefix = "ctx-core/quovo/quovo-users.tag";
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$user$$(ctx);
      assign__agent__quovo$user$id(ctx);
      const agent__quovo$user$$ = ctx.agent__quovo$user$$;
      agent__quovo$user$$.on("change", quovo$user$$__on$change);
      tag.ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , agent__quovo$user$$ = ctx.agent__quovo$user$$;
      agent__quovo$user$$.off("change", quovo$user$$__on$change);
    }
    function quovo$user$$__on$change() {
      log(`${logPrefix}|quovo$user$$__on$change`);
      tag.ctx$update(...arguments);
    }
  </script>
</quovo-users>