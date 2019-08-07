<script>
export let account
export let identifier
$: js__identifier = JSON.stringify(identifier)
</script>

<div id="disqus_thread"></div>

{@html `
<script type="text/javascript">
	/**
	 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
	 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
	var disqus_config = function () {
		this.page.url = window.location.href
		var hrefSegments = window.location.pathname.split('/')
		var identifier = ${js__identifier}
		this.page.identifier = identifier
	};
	(function () { // DON'T EDIT BELOW THIS LINE
		var d = document, s = d.createElement('script')
		s.src = 'https://${account}.disqus.com/embed.js'
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s)
	})()
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
`.trim()}
