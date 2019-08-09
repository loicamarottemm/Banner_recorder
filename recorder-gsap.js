const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

async function record(anim_url, classSizeBanner, filename, fps) {
  console.log('START VIDEO RECORDING');
  const args = ['-y', '-f', 'image2pipe', '-r', `${fps}`, '-i', '-', '-pix_fmt', 'yuv420p', '-crf', '2', filename];
  const ffmpeg = spawn('ffmpeg', args);

  const closed = new Promise((resolve, reject) => {
    ffmpeg.on('error', reject);
    ffmpeg.on('close', e => {
      resolve(e);
    });
  });

  //ffmpeg.stdout.pipe(process.stdout);
  //ffmpeg.stderr.pipe(process.stderr);

  const write = (stream, buffer) =>
    new Promise((resolve, reject) => {
      stream.write(buffer, error => {
        if (error) return reject(error);
        resolve();
      });
    });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(anim_url);
  } catch (e) {
    console.log('Error, the page does not load');
  }



 await page.waitForFunction(() =>
  {
    return new Promise(resolve => {
      var maxCheck = 100;
      var check = 0;
      var int = setInterval(() => {
        if (typeof window.timeline !== 'undefined') {
          resolve(true);
          clearInterval(int);
        } else {
          check++;
          if (maxCheck < check) {
            clearInterval(int);
            resolve(true);
          }
        }
      }, 100);
    });
  });


  console.log('recording...');
  try
  {

    const size = await page.evaluate((classSizeBanner)=>
    {
      const banner = document.querySelector(classSizeBanner) ;
      const style = getComputedStyle(banner);
      return [style.width, style.height];
    },classSizeBanner)

    const WIDTH = parseInt(size[0].replace( ' px',''));
    const HEIGHT = parseInt(size[1].replace( ' px',''));

    await page.setViewport({ width: WIDTH, height: HEIGHT });

    const frames = await page.evaluate(async fps => Math.ceil(window.timeline.duration() / 1 * fps), fps);
    let frame = 0;

    // pause and reset
    await page.evaluate(() => {
      window.timeline.pause();
      window.timeline.progress(0);
    });

    const nextFrame = async () => {
      console.log('---------- ' + frame + '/' + frames);

      await page.evaluate(async progress => {
        window.timeline.progress(progress);
      }, frame / frames);

      const screenshot = await page.screenshot();

      await write(ffmpeg.stdin, screenshot);

      frame++;

      if (frame > frames) {
        await browser.close();
        ffmpeg.stdin.end();

        console.log('---- Video done');

        await closed;
        return Promise.resolve('done');
      }

      return await nextFrame();
    };

    return await nextFrame();
  } catch (e) {
    console.log(e);
    return Promise.resolve(0);
  }
}

module.exports = {
  record,
};
