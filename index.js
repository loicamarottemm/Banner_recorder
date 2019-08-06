#!/usr/bin/env node

const inquirer = require('inquirer');
const FileSet = require('file-set');
const recordBanner = require ('./record_banner.js');
const fs = require('fs');
const server = require('./server.js');


async function main()
{
  let questions1 = [
    {
      type: 'input',
      name: 'input',
      message: 'Enter the path to the directory containing all banners: '
    }
  ]

  inquirer.prompt(questions1)
    .then(answer1=> {
      let url = server.runBanner(answer1.input);
      console.log(url);
      const FILE_TO_RECORD = new FileSet(answer1.input+ '/**/*.html');
      let questions2 = [
      {
        type: 'checkbox',
        name: 'files',
        message: 'Select banners to record',
        choices: FILE_TO_RECORD.files
      },
        {
          type:'input',
          name:'classSizeBanner',
          message:'Which CSS class or id contain the sizes of the banners ?',
          default:'.banner'
        },
      {
        type:'input',
        name: 'dest',
        message: 'Enter destination path for the videos:',
        default: './videos'
      },
      {
        type: 'input',
        name: 'fpsV',
        message: 'Enter video fps:',
        default: 60
      },
      {
        type: "input",
        name: 'fpsG',
        message: 'Enter gif fps:',
        default:60
      },
      {
        type: 'confirm',
        name: 'optimize',
        message: 'Do you want to optimize the size of GIFs ?',
        default: false
      }]
  
    inquirer.prompt(questions2)
    .then(async answer2=>{
      console.log(answer2);

      // create a folder 
      if (!fs.existsSync(answer2.dest))
      {
        console.log('creation of folder');
        fs.mkdir(answer2.dest ,(err) => {if (err) throw err;});
      }
      else
      {
        console.log('folder already exists');
      }

      // record each file selected
      for(let i=0; i<answer2.files.length ; i++)
      {
        let fileChosen = answer2.files[i].substring(answer1.input.length, answer2.files[i].length);
        let urlFile = url + fileChosen
        console.log(urlFile);

        await recordBanner.recordBanner(fileChosen,urlFile,answer2.classSizeBanner, answer2.fpsV, answer2.fpsG, answer2.dest, answer2.optimize);
      }
    })
  })
}



main();

