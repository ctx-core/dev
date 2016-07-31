<quovo-users class="{loading: !ctx.quovo__users}">
  <a href="quovo/users/{id}"
     class="{
      selected-maybe: true,
      selected: id == ctx.quovo__user_id}"
     each="{ctx.quovo__users}"
     onclick="{link__onclick__in}">
    <quovo-user>
      <quovo-user-id>{id}</quovo-user-id>
      <quovo-user-username>{username}</quovo-user-username>
      <quovo-user-email>{email}</quovo-user-email>
      <quovo-user-value>{format__currency(value)}</quovo-user-value>
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
      agent__quovo__users,
      agent__quovo__user_id} from "ctx-core/quovo/agent";
    import {mount__currency} from "ctx-core/currency/tag"
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            registerElement: [
              "quovo-user",
              "quovo-user-id",
              "quovo-user-username",
              "quovo-user-email",
              "quovo-user-value"]})
        , logPrefix = "ctx-core/quovo/quovo-users.tag";
    log(logPrefix);
    let ctx = tag.ctx;
    mount__currency(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      agent__quovo__users(ctx);
      agent__quovo__user_id(ctx);
      ctx.agent__quovo__users.on("change", quovo__users__on$change);
      tag.update__ctx();
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo__users.off("change", quovo__users__on$change);
    }
    function quovo__users__on$change() {
      log(`${logPrefix}|quovo__users__on$change`);
      tag.update__ctx(...arguments);
    }
  </script>
</quovo-users>