<quovo-users class="{loading: !ctx.quovo$user$$}">
  <a href="quovo/users/{id}"
     class="{
      selected-maybe: true,
      selected: id == ctx.quovo$user$id}"
     each="{ctx.quovo$user$$}"
     onclick="{link$onclick}">
    <quovo-user>
      <id>{id}</id>
      <username>{username}</username>
      <email>{email}</email>
      <value>{currency$format(this)}</value>
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
    import {assign} from "ctx-core/object/lib";
    import {
      assign__quovo$user$$_agent,
      assign__quovo$user$id_agent} from "./agent";
    import {currency$format} from "ctx-core/currency/lib"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this, {currency$format: currency$format})
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
      tag.assign__ctx$update();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      const ctx = tag.ctx
          , quovo$user$$_agent = ctx.quovo$user$$_agent;
      quovo$user$$_agent.off("change", quovo$user$$$on$change);
    }
    function quovo$user$$$on$change() {
      log(`${logPrefix}|quovo$user$$$on$change`);
      tag.assign__ctx$update(...arguments);
    }
  </script>
</quovo-users>