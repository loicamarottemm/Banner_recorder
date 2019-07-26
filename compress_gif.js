const compress_images = require('compress-images');


class CompressGif
{
  static async main() {

    //get arg
    if(process.argv.length < 4)
    {
      console.log('Arguments needed: [path] [number of color]');
      return ;
    }
    const PATH = process.argv[2];
    const COLOR = process.argv[3];

    compress_images(PATH+'/*.gif',
      PATH+'/' ,
      {compress_force:true, statistic:true, autoupdate:true},
      false,
      {jpg: {engine: false, command: false}},
      {png: {engine: false, command: false}},
      {svg: {engine: false, command: false}},
      {gif: {engine: 'gifsicle', command: ['-O2','--colors', COLOR,'--use-col=web']}},
      function(err, completed){
        if(completed === true){
        console.log('gif compressed');
      }
    })

    }



}

CompressGif.main();
