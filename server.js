const express = require('express');
const app = express() ;


function runBanner(path)
{
  app.use(express.static (path));
  let host = 'localhost' ;
  let port = 8000;

  const server = app.listen(port, host) ;
  let url = 'http://'+ host + ':'+port ;
  return url;
}


module.exports = {
  runBanner
};
