const spawn = require('child_process').spawn;
const rimraf = require('rimraf');
const flat = (a, b) => a.concat(b);

async function createGif(input, output,fpsG){
  console.log('START GIF');

  // init all variable for ffmpeg
  let tmpFileName = input + '__tmp__palette_' + Date.now() + '.png';
  let inputFlag = [ '-i', input ];
  let fps = 'fps=' + fpsG + '';
  let filter1 = [ '-vf', fps+ ',palettegen'  ];
  let filter2 = [ '-filter_complex', fps + '[x];[x][1:v]paletteuse '];

  let pass1Flags = [ '-y', inputFlag, filter1, tmpFileName].filter(Boolean).reduce(flat, []);
  let pass2Flags = [ '-y', inputFlag, '-i', tmpFileName, filter2, '-f', 'gif',  output ].filter(Boolean).reduce(flat, []);

  // first pass
  let proc = spawn('./ffmpeg', pass1Flags);
  const closed = new Promise((resolve, reject) =>
  {
    console.log('closed');
    proc.on('error', reject);
    proc.on('close', resolve);
  });

  // second pass when it is done
  await closed ;
  let proc2 = spawn('./ffmpeg', pass2Flags);
  const closed2 = new Promise((resolve, reject) =>
  {
    console.log('closed');
    proc2.on('error', reject);
    proc2.on('close', resolve);
  });

  // exit when done
  await closed2 ;
  console.log('------- Gif done');
  rimraf.sync(tmpFileName);
  return Promise.resolve('done gif');
}


module.exports = {
  createGif
}
