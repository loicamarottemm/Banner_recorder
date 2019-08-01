const path = require('path');


function getURL(pathToFile, dirName, portNumber,ip)
{
  let fileNamePath = path.dirname(pathToFile);
  let nameOfHTML = path.basename(pathToFile);

  let urlPos = fileNamePath.indexOf(dirName);
  let urlName = fileNamePath.substring(urlPos);

  urlName = urlName.replace(new RegExp('/', 'g'), '_');
  urlName = urlName.replace(new RegExp('\\\\', 'g'), '_');

  return [urlName,'http://'+ ip +':' + portNumber + '/' + urlName + '/' + nameOfHTML] ;
}

module.exports = {
  getURL
}

