const FileSet = require('file-set');
const fs = require('fs');
const server = require('./server.js');
const recordBanner = require ('./record_banner.js');

async function recordMultiple(path, destPath,classSizeBanner, fpsVideo, fpsGif, optimizeGif)
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

    await recordBanner.recordBanner(fileChosen,urlFile,classSizeBanner, fpsVideo, fpsGif, destPath, optimizeGif);
  }
  process.exit(1);
}

module.exports = {
  recordMultiple
}
