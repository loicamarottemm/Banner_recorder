const findInFiles = require('find-in-files');

/*
/////////// sizes available ////////////////////////////////
const SIZES_TAB = [
  [new RegExp('.*300.*'), 300],
  [new RegExp('.*250.*'), 250],
  [new RegExp('.*728.*'), 728],
  [new RegExp('.*90.*'), 90],
  [new RegExp('.*160.*'), 160],
  [new RegExp('.*600.*'), 600]  ];
////////////////////////////////////////////////////////////
*/

let SIZES_TAB = [];

// add value to SIZES_TAB
async function addSize(tabSize)
{
  for (let i=0; i<tabSize.length; i++)
  {
    SIZES_TAB.push([new RegExp('.*'+ tabSize[i] + '.*'), tabSize[i]]);
  }
}


// return the size of the banner
  async function getSize(path) {
    const f = '.richmediarc';
    let resW;
    let resH;

    console.log('--------banner size------------');

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

    let found = 0 ;
    let i = 0 ;
    while(found<2 || i<SIZES_TAB.length)
    {
      // width
      if(SIZES_TAB[i][0].test(sW))
      {
        width = SIZES_TAB[i][1] ;
        found ++;
      }
      // height
      if(SIZES_TAB[i][0].test(sH))
      {
        height = SIZES_TAB[i][1] ;
        found ++;
      }
      i++;
    }


    return [width, height];
  }



module.exports = {
  addSize,
 getSize
}
