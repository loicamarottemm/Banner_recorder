const { recordBanner } = require('./record_banner');
const recordMultiple = require('./record_multiple');
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



/*
  setTimeout(async() => {
   // await server.closeServer();

    console.log(server.runBanner('./test/testFile/src_160x600_SharedChannels_160x600'));
*/


//  }, 5000);
 let url = server.runBanner('./test/testFile/src_300x250_search_300x250');
  console.log(url);

//gsap.record(url, '.banner', './videos/test.mov', 10);


//recordMultiple.recordMultiple('C:\\Users\\loica.marotte\\Desktop\\Banner_recorder\\test\\testFile', './videos','.banner', 10, 10, true);

//let url = server.runBanner('C:\\xampp\\htdocs\\banners\\k\\slack-monetization-campaign\\build\\src_160x600_Apps_160x600');
//console.log(url);
