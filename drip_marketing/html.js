import env from 'ctx-core/env'
import {clone} from 'ctx-core/object/lib'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/drip_marketing/html'
export function $script__drip(ctx, ...opts$$) {
  log(`${logPrefix}|$script__drip`)
  const opts = clone(...opts$$)
      , DRIP_ID = opts.DRIP_ID || env.DRIP_ID
  if (!DRIP_ID) throw__missing_argument(ctx, {key: 'env.DRIP_ID'})
  return `
  <script type="text/javascript">
    if (typeof window._dcq === 'undefined') {
      var _dcq = _dcq || [];
      var _dcs = _dcs || {};
      _dcs.account = '${DRIP_ID}';
    
      (function() {
        var dc = document.createElement('script');
        dc.type = 'text/javascript'; dc.async = true;
        dc.src = '//tag.getdrip.com/${DRIP_ID}.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(dc, s);
      })();      
    }
  </script>`.trim()
}