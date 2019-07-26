const FileSet = require('file-set');
const { exec } = require('child_process');
const fs = require('fs');
const recordBanner = require ('./record_banner.js');



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
    const DEST_PATH = process.argv[4];
    const FPS_VIDEO  = process.argv[5];
    const FPS_GIF = process.argv[6];


    // ----------------------- find files to record ------------------------------
    console.log('---------- FILES TO RECORD : ');
    const FILE_TO_RECORD = new FileSet(PATH + '/**/*.html');
    console.log(FILE_TO_RECORD);


    // ---------------- create a folder -----------------------------------------
    if (!fs.existsSync(DEST_PATH))
    {
      console.log('creation of folder')
      await fs.mkdir(DEST_PATH ,(err) => {
      if (err) throw err;
      });
    }


    // ------------------------ For each file ------------------------------------
    for(let i=0; i<FILE_TO_RECORD.files.length ; i++)
    {
      let pathToFile = FILE_TO_RECORD.files[i];
      recordBanner.recordBanner(pathToFile, PORT_NUMBER, FPS_VIDEO, FPS_GIF, DEST_PATH);

    }
    process.exit(1);
  }
}

// ------------------------- FUNCTIONS -----------------------------------------------


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
