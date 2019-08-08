const assert = require('assert');

const server = require('../server');
const recorder_gsap = require('../recorder-gsap');
const ffmpeg_gif = require('../ffmpeg-gif');
const compress_gif = require('../compress_gif');

/*
describe('Server', function()
{
  describe('runBanner', function()
  {
    it('should return the right url', function(){
      let url = server.runBanner('./testFile');
      assert.equal(url, 'http://localhost:8000');
    })
  })
})
*/

describe('recorder-gsap', function()
{
  describe('record', function()
  {
    it('should return \'done\' if recording went well', function()
    {
      this.timeout(15000);
      let url = server.runBanner('./test/testFile/src_300x250_test');
      console.log(url);
      return recorder_gsap.record(url, '.banner', './test/videos/test.mov', 10).then(function (res) {
        assert.equal('done',res);
      });
    })
  })
})

describe('ffmpeg-gif', function()
{
  describe('createGif', function()
  {
    it('should return \'done gif\' if the gif creation went well', function()
    {
      return ffmpeg_gif.createGif('./test/videos/test.mov', './test/videos/test.gif',10).then(function (res) {
        assert.equal('done gif',res);
      });
    })
  })
})


describe('compress-gif', function()
{
  describe('compressGif', function()
  {
    it('should return \'done compressing gif\' if the gif compression went well', function()
    {
      return compress_gif.compressGif('./test/videos').then(function (res) {
        assert.equal('done compressing gif',res);
      });
    })
  })
})
