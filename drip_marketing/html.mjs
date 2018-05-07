import env from 'ctx-core/env.mjs'
import {clone} from 'ctx-core/object/lib.mjs'
import {throw__missing_argument} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/drip_marketing/html.mjs'
export function _script__drip(...array__opts) {
	log(`${logPrefix}|$script__drip`)
	const opts = clone(...array__opts)
	const DRIP_ID = opts.DRIP_ID || env.DRIP_ID
	if (!DRIP_ID) throw__missing_argument(opts, {key: 'env.DRIP_ID'})
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