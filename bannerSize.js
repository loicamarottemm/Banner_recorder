const findInFiles = require('find-in-files');


/////////// sizes available ////////////////////////////////
const WIDTH_300 = new RegExp('.*300.*');           //
const HEIGHT_250 = new RegExp('.*250.*');          //
const WIDTH_728 = new RegExp('.*728.*');           //
const HEIGHT_90 = new RegExp('.*90.*');            //
const WIDTH_160 = new RegExp('.*160.*');           //
const HEIGHT_600 = new RegExp('.*600.*');          //
////////////////////////////////////////////////////////////



// return the size of the banner
  async function getSize(path) {
    const f = '.richmediarc';
    let resW;
    let resH;
    await findInFiles.find('width\":.*,', path, f)
      .then(function (results) {
        for (let result in results) {
          let res = results[result];
          resW = res.matches[0];
          return;
        }
      });
    await findInFiles.find('height\":.*', path, f)
      .then(function (results) {
        for (let result in results) {
          let res = results[result];
          resH = res.matches[0];
          return;
        }
      });
    let size = findSize(resW, resH);
    return size;
  }


// finding the size of a banner in a string
  async function findSize(sW, sH) {
    let width, height;

    // width
    if (WIDTH_300.test(sW)) {
      width = 300;
    } else if (WIDTH_728.test(sW)) {
      width = 728;
    } else if (WIDTH_160.test(sW)) {
      width = 160;
    }

    // height
    if (HEIGHT_250.test(sH)) {
      height = 250;
    } else if (HEIGHT_90.test(sH)) {
      height = 90;
    } else if (HEIGHT_600.test(sH)) {
      height = 600;
    }

    return [width, height];
  }



module.exports = {
 getSize
}
