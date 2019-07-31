const FileSet = require('file-set');
const fs = require('fs');
const p = require('path');

const recordBanner = require ('./record_banner.js');


async function recordMultiple(path, portNumber, destPath, fpsVideo, fpsGif, optimizeGif)
{
  // ----------------------- find files to record ------------------------------
  console.log('---------- FILES TO RECORD : ');
  const FILE_TO_RECORD = new FileSet(path + '/**/*.html');
  console.log(FILE_TO_RECORD);

  // ---------------- create a folder -----------------------------------------
  if (!fs.existsSync(destPath))
  {
    console.log('creation of folder');
    await fs.mkdir(destPath ,(err) => {if (err) throw err;});
  }
  else
  {
    console.log('folder already exists');
  }

  // ------------------------ For each file ------------------------------------
  for(let i=0; i<FILE_TO_RECORD.files.length ; i++)
  {
    let pathToFile = FILE_TO_RECORD.files[i];
    await recordBanner.recordBanner(pathToFile,p.basename(path), portNumber, fpsVideo, fpsGif, destPath, optimizeGif);
  }

  process.exit(1);
}


module.exports = {
  recordMultiple
}
