const FileSet = require('file-set');
const fs = require('fs');
const p = require('path');

   const bannerSize = require ('./bannerSize.js');


async function recordMultiple(path, portNumber, ip, destPath, fpsVideo, fpsGif, optimizeGif)
{
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
    let pathToFile = FILE_TO_RECORD.files[i];
    await recordBanner.recordBanner(pathToFile,p.basename(path), portNumber,ip, fpsVideo, fpsGif, destPath, optimizeGif);
  }

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
