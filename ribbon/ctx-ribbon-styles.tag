<ctx-ribbon-styles>
  <style>
    .ctx-ribbon {
      width: 24.1em;
      height: 24.1em;
      position: absolute;
      overflow: hidden;
      top: 0;
      right: 0;
      z-index: 9999;
      pointer-events: none;
      font-size: 1rem;
      text-decoration: none;
      text-indent: -999999px;
    }
    .ctx-ribbon.fixed {
      position: fixed;
    }
    .ctx-ribbon:before, .ctx-ribbon:after {
      position: absolute;
      display: block;
      width: 30.38em;
      height: 2.54em;
      top: 5.23em;
      right: -8.23em;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .ctx-ribbon:before {
      content: "";
      padding: .38em 0;
      background-color: #33D18D;
      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.15)));
      background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
      background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
      background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
      background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
      -webkit-box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
      box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    .ctx-ribbon:hover:before {
      background-color: #3BEFA2;
    }
    .ctx-ribbon:after {
      content: attr(title);
      color: #fff;
      font-family: "NeuzeitGro-Bla", Helvetica, Arial, sans-serif;
      line-height: 1.54em;
      text-decoration: none;
      text-shadow: 0 -.08em rgba(0, 0, 0, 0.2);
      text-align: center;
      text-indent: 0;
      padding: .75em 0;
      margin: .35em 0;
    }
  </style>
</ctx-ribbon-styles>