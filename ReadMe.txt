to install modules
	npm install
to run banners
	npm run dev 
	select the one you want to record
to start recording videos and gif
	use module bannerSize.js
	-> use the function addSize(dimensions)
		dimension: Array of the sizes of the banner to record
	use module record_multiple.js
	-> use the function recordMultiple(path, portNumber, ip, destPath, fpsVideo, fpsGif, optimizeGif)
		path: path of the directory containing all banners
		portNumber: port used to run banners
		ip: ip adess used to run banners (can be 'localhost')
		destPath: path destination for videos and gifs
		fpsVideo: fps for the video
		fpsGif: fps for the gif
		optimizeGif: boolean to optimize the size of gifs (up to 60%)
