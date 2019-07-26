const bannerSize = require ('./bannerSize.js');
const path = require('path');

async function recordBanner (pathToFile, portNumber, fpsVideo, fpsGif, destPath) {
// find the name of the html file
  let nameOfHTML = path.basename(pathToFile);
  console.log(nameOfHTML);

// find the path of file
  let fileNamePath = path.dirname(pathToFile);

// --------- find the size of banner -----------------------------------------
  console.log('---------- SIZE OF VIDEO : ');
  let size = await bannerSize.getSize(fileNamePath);
  const WIDTH = size[0];
  const HEIGHT = size[1];

  console.log(WIDTH + 'x' + HEIGHT);

// ----------- find the url -------------------------------------------------
  fileNamePath = fileNamePath.substring(2, fileNamePath.lastIndex).replace(new RegExp('/', 'g'), '_');
  console.log(fileNamePath);
  console.log('---------- URL : ');
  const URL = 'http://localhost:' + portNumber + '/' + fileNamePath + '/' + nameOfHTML;
  console.log(URL);


// --------- find the video name ---------------------------------------------
  console.log('---------- VIDEO NAME : ');
  const VIDEO_NAME = destPath+ '/' + fileNamePath;
  console.log(VIDEO_NAME);


// --------- Create video .mov ----------------------------------------------
  console.log('creation of video')
  await launchRecorder(URL, WIDTH, HEIGHT, VIDEO_NAME, fpsVideo, fpsGif);
}



module.exports = {
  recordBanner
}
