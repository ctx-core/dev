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
    import {fn$tag} from "ctx-core/tag/lib";
    import {
      assign__quovo$user$$_agent,
      assign__quovo$user$id_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {
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
      assign__quovo$user$$_agent(ctx);
      assign__quovo$user$id_agent(ctx);
      const quovo$user$$_agent = ctx.quovo$user$$_agent;
      quovo$user$$_agent.on("change", quovo$user$$$on$change);
      tag.ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , quovo$user$$_agent = ctx.quovo$user$$_agent;
      quovo$user$$_agent.off("change", quovo$user$$$on$change);
    }
    function quovo$user$$$on$change() {
      log(`${logPrefix}|quovo$user$$$on$change`);
      tag.ctx$update(...arguments);
    }
  </script>
</quovo-users>