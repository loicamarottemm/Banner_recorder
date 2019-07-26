'use strict'

// https://github.com/clipisode/puppeteer-recorder/blob/master/index.js



const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const fs = require('fs-extra')


// Arguments
const ANIM_URL = process.argv[2];
const WIDTH = parseInt(process.argv[3]);
const HEIGHT = parseInt(process.argv[4]);
const filename =  process.argv[5] + '.mov';
const FPS = parseInt(process.argv[6]);;




const SAVE_IMG = false;

// x1.5 => 1080p
// x3 => 4k
// x6 => 8k
const SCALE = 1

const getRes = (scale = SCALE) => ({
  1: 'hd',
  '1.5': 'fullhd',
  3: '4k',
  6: '8k'
})[scale]

function until(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
/*
const filename = () => {
  if (!getRes()) {
    throw Error(`Invalid scale, must be one of these: ${Object.keys(res).join()}`)
  }

  return `video-${getRes()}.mov`
}
*/
SAVE_IMG && fs.emptyDir(`./frames-${getRes()}`)

const args = [
  '-y',
  '-f',
  'image2pipe',
  '-r',
  `${FPS}`,
  '-i',
  '-',
  '-pix_fmt',
  'yuv420p',
  '-crf',
  '2',
  filename
]

const ffmpeg = spawn('ffmpeg', args)

const closed = new Promise((resolve, reject) => {
  console.log('closed');
  
  ffmpeg.on('error', reject)
  ffmpeg.on('close', resolve)
})

ffmpeg.stdout.pipe(process.stdout)
ffmpeg.stderr.pipe(process.stderr)

const write = (stream, buffer) =>
  new Promise((resolve, reject) => {
   // console.log('write');
    stream.write(buffer, error => {
      if (error) return reject(error)
      resolve()
    })
  })

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: SCALE
  });

  try {
    await page.goto(ANIM_URL);
  }
  catch (e) {
    console.log("Error, the page does not load");
  }


  await page.waitForFunction(() => {

    return new Promise(resolve => {
      var maxCheck = 100;
      var check = 0;
      var int = setInterval(() => {
        console.log(typeof window.timeline);
        
        if(typeof window.timeline !== 'undefined'){
          resolve(true);
          clearInterval(int);
        } else {
          check++;
          if(maxCheck < check){
            clearInterval(int);
            resolve(true);
          }
        }
      }, 100);
    });
  });
  
  console.log('------------------------');
  const frames = await page.evaluate(async fps =>
      Math.ceil(window.timeline.duration() / 1 * fps)
    , FPS)
  let frame = 0

  // pause and reset
  await page.evaluate(() => {
    // console.log('asdad', window.timeline);
    window.timeline.pause()
    window.timeline.progress(0)
  })

  const nextFrame = async () => {
    await page.evaluate(async progress => {
      window.timeline.progress(progress)
      // await new Promise(r => setTimeout(r, 16))
    }, frame / frames)

    const filename = (`${frame}`).padStart(6, '0')
    const opts = SAVE_IMG ? { path: `./frames-${getRes()}/frame${filename}.png` } : undefined
    const screenshot = await page.screenshot(opts)
    await write(ffmpeg.stdin, screenshot)

    frame++

   // console.log(`frame ${frame} / ${frames}`)

    if (frame > frames) {
      console.log('done!')
      await browser.close()

      ffmpeg.stdin.end()
      await closed
      return
    }

    nextFrame()
  }

  nextFrame()
})()
