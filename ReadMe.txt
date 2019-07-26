to install modules
	go to bin directory
	npm install
to run banners
	npm run dev 
	select the one you want to record
to start recording videos and gif
	go to bin directory
	node record_multiple [path] [port] [fpsV] [fpsG]
		path: relative path to src directory
		port: port number
		fpsV: fps for the .mov 
		fpsG: fps for the .gif
to compress gif
	node compress_gif [path] [color]
		path: path to video_recordings directory
		color: number of colors in gif
