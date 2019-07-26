const FileSet = require('file-set');
const { exec } = require('child_process');
const findInFiles = require('find-in-files');
const fs = require('fs');


/////////// sizes available ////////////////////////////////
const WIDTH_300 = new RegExp('.*300.*');           //
const HEIGHT_250 = new RegExp('.*250.*');          //
const WIDTH_728 = new RegExp('.*728.*');           //
const HEIGHT_90 = new RegExp('.*90.*');            //
const WIDTH_160 = new RegExp('.*160.*');           //
const HEIGHT_600 = new RegExp('.*600.*');          //
////////////////////////////////////////////////////////////



class RecordMultiple
{
  static async main()
  {
    // ---------------------- get args -------------------------------------------
    if(process.argv.length < 4 || process.argv.length > 7)
    {
      console.log('Arguments structure : [path] [port] [dest] [fps_video] [fps_gif]');
      return ;
    }
    const PATH = process.argv[2];
    const PORT_NUMBER = process.argv[3];
    const FOLDER_PATH = process.argv[4];
    const FPS_VIDEO  = process.argv[5];
    const FPS_GIF = process.argv[6];


    // ----------------------- find files to record ------------------------------
    console.log('---------- FILES TO RECORD : ');
    const FILE_TO_RECORD = new FileSet(PATH + '/**/*.html');
    console.log(FILE_TO_RECORD);


    // ---------------- create a folder -----------------------------------------

    if (!fs.existsSync(FOLDER_PATH))
    {
      console.log('creation of folder')
      await fs.mkdir(FOLDER_PATH ,(err) => {
      if (err) throw err;
      });
    }


    // ------------------------ For each file ------------------------------------
    for(let i=0; i<FILE_TO_RECORD.files.length ; i++)
    {
      // ----------- find the name of file ---------------------------------------
      var pathToFile = FILE_TO_RECORD.files[i];

      // find the name of the html file
      var nameOfHTML = '';
      var regex = new RegExp('/[a-zA-z0-9]+\\.html');
      var posOfHTML = pathToFile.search(regex);
      for(let j=posOfHTML+1; j<pathToFile.length ; j++)
      {
        nameOfHTML = nameOfHTML + pathToFile[j];
      }
      console.log(nameOfHTML);


      // ----------- find the path of file ---------------------------------------
      var fileNamePath = '';
      for(let j=0; j<(pathToFile.length-(3+nameOfHTML.length+1)) ; j++)
      {
          fileNamePath = fileNamePath + pathToFile[j+3];
      }


      // --------- find the size of banner -----------------------------------------
      console.log('---------- SIZE OF VIDEO : ');
      var size = await getSize('../'+ fileNamePath);
      const WIDTH = size[0];
      const HEIGHT = size[1];

      console.log(WIDTH + 'x' + HEIGHT);

      // ----------- find the url ---------------------------------------
      fileNamePath = fileNamePath.replace(new RegExp('/', 'g'),'_');
      console.log(fileNamePath);
      console.log('---------- URL : ');
      const URL = 'http://localhost:' + PORT_NUMBER + '/' + fileNamePath + '/' + nameOfHTML ;
      console.log(URL);


      // --------- find the video name ---------------------------------------------
      console.log('---------- VIDEO NAME : ');
      const VIDEO_NAME = FOLDER_PATH + '/' + fileNamePath ;
      console.log(VIDEO_NAME);


      // --------- Create video .mov ----------------------------------------------
      console.log('creation of video')
      await launchRecorder(URL,WIDTH,HEIGHT,VIDEO_NAME, FPS_VIDEO,FPS_GIF);
    }
  }
}

// ------------------------- FUNCTIONS -----------------------------------------------
// return the size of the banner
async function getSize(path)
{
  const f = '.richmediarc' ;
  var resW ;
  var resH ;
  await findInFiles.find('width\":.*,', path, f)
    .then(function(results) {
      for (var result in results) {
        var res = results[result];
        resW = res.matches[0];
        return ;
      }
    });
  await findInFiles.find('height\":.*', path, f)
    .then(function(results) {
      for (var result in results) {
        var res = results[result];
        resH = res.matches[0];
        return ;
      }
    });
  console.log('w: ' + resW + ' h: ' +resH);
  var size = findSize(resW,resH);
  return size ;
}

// finding the size of a banner in a string
async function findSize(sW, sH)
{
  var width, height;

  // width
  if (WIDTH_300.test(sW))
  {
    width = 300;
  }
  else if (WIDTH_728.test(sW))
  {
    width = 728;
  }
  else if (WIDTH_160.test(sW))
  {
    width = 160;
  }

  // height
  if (HEIGHT_250.test(sH))
  {
    height = 250;
  }
  else if (HEIGHT_90.test(sH))
  {
    height = 90;
  }
  else if (HEIGHT_600.test(sH))
  {
    height = 600;
  }

  return [width,height];
}


// launch the recorder-gsap.js and the ffmpeg-gif
async function launchRecorder(url,width,height,name, fps_video, fps_gif)
{
  let cmd = 'launch_recorder.cmd ' + url + ' ' + width + ' ' + height + ' ' + name+ ' ' + fps_video+ ' ' + fps_gif;  // for windows
  //  let cmd = 'launch_recorder.command ' + url + ' ' + width + ' ' + height + ' ' + name+ ' ' + fps_video+ ' ' + fps_gif;  // for mac
  await exec( cmd, (err, stdout, stderr) => {
    console.log(cmd);
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}


// ------------------------- main -----------------------------------------------
RecordMultiple.main();
