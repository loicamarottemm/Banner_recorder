Banner-recorder
===============

## To install modules

	* npm install

## To link command line

	* npm link

## To run banners

	* npm run dev 
	* select the one you want to record

## To start recording videos and gif

### Using **function** in js program 

	#### use module record_multiple.js

	1. use the function _addBannerSize(dimensions)_
		* dimension: Array containing the sizes of the banner to record	
	example: addBannerSize([300,250])

	2. use the function _recordMultiple(path, portNumber, ip, destPath, fpsVideo, fpsGif, optimizeGif)_
		* path: path of the directory containing all banners
		* portNumber: port used to run banners
		* ip: ip adess used to run banners (can be 'localhost')
		* destPath: path destination for videos and gifs
		* fpsVideo: fps for the video
		* fpsGif: fps for the gif
		* optimizeGif: boolean to optimize the size of gifs (up to 60%)

### Using **command** line

	* npm link
	* record-multiple 
