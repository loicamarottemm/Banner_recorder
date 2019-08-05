const { recordBanner } = require('./record_banner');
const bannerSize = require ('./bannerSize.js');
const recordMultiple = require('./record_multiple');
const urlBanner = require('./urlBanner');
const compressGif = require('./compress_gif');
const gsap = require('./recorder-gsap');
const server = require('./server.js');




// console.log(__dirname);
/*
recordBanner('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\src\\160x600\\Apps_160x600_b/index.html'
  ,'src', 8000, 10, 10, 'C:\\Users\\loica.marotte\\Desktop\\Banner_recorder\\vid')

*/
/*
async function main()
{
  bannerSize.addSize([300,250,728,90]);
  let size = await bannerSize.getSize('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\src\\728x90\\Apps_728x90_b');
  console.log(size);
}

main();
*/
/*
recordMultiple.addBannerSize([300,250,728,90,160,600]);
recordMultiple.recordMultiple('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\src', 8000,'localhost','./vid', 20,10, true) ;
*/
/*
let url = urlBanner.getURL('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\src\\728x90\\Apps_728x90_b\\index.html', 'src', 800);
console.log(url[0]);
console.log(url[1]);
*/

//compressGif.compressGif('C:\\Users\\loica.marotte\\Desktop\\Banner_recorder\\gif',24);

//recordBanner('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\build\\src_160x600_Apps_160x600', 0, 0, 0, 0);

//let url = 'http://localhost:8001/src_160x600_Search_160x600_b/index.html';

let url = server.runBanner('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\build\\src_160x600_Search_160x600_b');
console.log(url);
gsap.record(url, 160, 600, './videos/test.mov', 10);

