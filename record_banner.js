const bannerSize = require ('./bannerSize.js');
const recorder_gsap = require ('./recorder-gsap.js');
const ffmpeg_gif = require('./ffmpeg-gif');
const urlBanner = require('./urlBanner');
const compressGif = require('./compress_gif');

const path = require('path');


async function recordBanner (pathToFile,dirName, portNumber, fpsVideo, fpsGif, destPath, optimizeGif)
{
// find the name of the html file
  console.log('---------- NAME OF FILE : ');
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
  const resUrl = urlBanner.getURL(pathToFile,dirName,portNumber);
  const urlName = resUrl[0];
  const URL = resUrl[1];

  console.log('---------- URL : ');
  console.log(URL);


// --------- find the video/gif name ---------------------------------------------
  console.log('---------- VIDEO NAME : ');
  const VIDEO_NAME = destPath+ '/' + urlName + '.mov';
  console.log(VIDEO_NAME);
  console.log('----------  GIF NAME : ');
  const GIF_NAME = destPath+ '/' + urlName + '.gif';
  console.log(GIF_NAME);


// --------- Create video .mov ----------------------------------------------
  console.log('----------  CREATION OF VIDEO : ');
  let res = await recorder_gsap.record(URL,WIDTH,HEIGHT,VIDEO_NAME,fpsVideo);
  if(res == 0)
  {
    console.log('Animation not running');
    return;
  }
  console.log(`RES = ${res}`);


  // --------- Create gif --------------------------------------------------
  console.log('----------  CREATION OF GIF : ');
  let res2 = await ffmpeg_gif.createGif(VIDEO_NAME,GIF_NAME,fpsGif);
  console.log(`RES = ${res2}`);

  // --------- Compress gif --------------------------------------------------
  if(optimizeGif)
  {
    console.log('----------  COMPRESSION OF GIF : ');
    await compressGif.compressGif(destPath);
  }

}

module.exports = {
  recordBanner
}


