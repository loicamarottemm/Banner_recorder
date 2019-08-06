const bannerSize = require ('./bannerSize.js');
const recorder_gsap = require ('./recorder-gsap.js');
const ffmpeg_gif = require('./ffmpeg-gif');
const compressGif = require('./compress_gif');


async function recordBanner (pathToFile, url, classSizeBanner, fpsVideo, fpsGif, destPath, optimizeGif)
{
// --------- find the video/gif name ---------------------------------------------
  let animName = pathToFile.replace(new RegExp('/','g'), '_');
  animName = animName.replace(new RegExp('.html','g'), '');
  let videoName = destPath +'/' + animName + '.mov';
  let gifName = destPath +'/' + animName + '.gif';
  console.log(videoName);
  console.log(gifName);

  // --------- Create video .mov ----------------------------------------------
  console.log('----------  CREATION OF VIDEO : ');
  let res = await recorder_gsap.record(url,classSizeBanner, videoName,fpsVideo);
  console.log(res);
  if(res == 0)
  {
    console.log('Animation not running');
    return;
  }
  console.log(`RES = ${res}`);

  // --------- Create gif --------------------------------------------------
  console.log('----------  CREATION OF GIF : ');
  let res2 = await ffmpeg_gif.createGif(videoName,gifName,fpsGif);
  console.log(`RES = ${res2}`);


  // --------- Compress gif --------------------------------------------------
  if(optimizeGif)
  {
    console.log('----------  COMPRESSION OF GIF : ');
    let res3 = await compressGif.compressGif(destPath);
  }

}


module.exports = {
  recordBanner,
}


