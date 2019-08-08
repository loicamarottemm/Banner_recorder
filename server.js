const express = require('express');
const http = require('http');
const app = express() ;

const host = 'localhost' ;

let server ;

function runBanner(path)
{
  app.use(express.static (path));

  server = http.createServer(app);
  console.log(path);

  server.listen() ;

  let url = 'http://'+ host + ':'+ server.address().port ;

  return url;
}

async function closeServer()
{
  server.close(function(){
    console.log('server stopped');
  });
}



module.exports = {
  runBanner,
  closeServer
};

