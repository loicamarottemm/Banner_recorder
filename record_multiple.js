const FileSet = require('file-set');
const fs = require('fs');
const p = require('path');
const server = require('./server.js');
const recordBanner = require ('./record_banner.js');


   const bannerSize = require ('./bannerSize.js');


async function recordMultiple(path, destPath, fpsVideo, fpsGif, optimizeGif)
{
  // ----------------------- Run banners ---------------------------------------
  let url = server.runBanner(path);

  // ----------------------- find files to record ------------------------------
  console.log('---------- FILES TO RECORD : ');
  const FILE_TO_RECORD = new FileSet(path + '/**/*.html');
  console.log(FILE_TO_RECORD);

  // ---------------- create a folder -----------------------------------------
  if (!fs.existsSync(destPath))
  {
    console.log('creation of folder');
    fs.mkdir(destPath ,(err) => {if (err) throw err;});
  }
  else
  {
    console.log('folder already exists');
  }

  // ------------------------ For each file ------------------------------------
  for(let i=0; i<FILE_TO_RECORD.files.length ; i++)
  {
    let fileChosen = FILE_TO_RECORD.files[i].substring(path.length, FILE_TO_RECORD.files[i].length);
    let urlFile = url + fileChosen;
    console.log(urlFile);

    await recordBanner.recordBanner(fileChosen,urlFile, fpsVideo, fpsGif, destPath, optimizeGif);
  }

  /*

  for(let i=0; i<FILE_TO_RECORD.files.length ; i++)
  {
    let pathToFile = FILE_TO_RECORD.files[i];
    await recordBanner.recordBanner(pathToFile,p.basename(path), portNumber,ip, fpsVideo, fpsGif, destPath, optimizeGif);
  }
*/
  process.exit(1);
}


async function addBannerSize(tabSize)
{
  bannerSize.addSize(tabSize);
}


module.exports = {
  recordMultiple,
  addBannerSize
}
