import { clone } from '@ctx-core/object'
import { throw__missing_argument } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/drip_marketing/html.js'
export function _script__drip(...a1__opt) {
	log(`${logPrefix}|$script__drip`)
	const opts = clone(...a1__opt)
	const DRIP_ID = opts.DRIP_ID || process.env.DRIP_ID
	if (!DRIP_ID) throw__missing_argument(opts, { key: 'process.env.DRIP_ID' })
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
