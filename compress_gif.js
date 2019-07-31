const compress_images = require('compress-images');



async function compressGif(path)
{
  compress_images(path+'/*.gif',
    path+'/' ,
    {compress_force:true, statistic:true, autoupdate:true},
    false,
    {jpg: {engine: false, command: false}},
    {png: {engine: false, command: false}},
    {svg: {engine: false, command: false}},
    {gif: {engine: 'gifsicle', command: ['-O2','--colors', 32,'--use-col=web']}},
    function(err, completed){
    if(completed === true){
      console.log('gif compressed');
      console.log(err);
    }
  })

}


module.exports = {
  compressGif
}

