if device.desktop()

else if device.mobile()

	$ = document # shortcut
	cssId = 'myCss' # you could encode the css path itself to generate id..
	if !$.getElementById(cssId)
	    head  = $.getElementsByTagName('head')[0]
	    link  = $.createElement('link')
	    link.id   = cssId
	    link.rel  = 'stylesheet'
	    link.type = 'text/css'
	    link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css'
	    link.media = 'all'
	    head.appendChild(link)
