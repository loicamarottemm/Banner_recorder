#!/usr/bin/env node

const inquirer = require('inquirer');
const FileSet = require('file-set');
const recordBanner = require ('./record_banner.js');
const fs = require('fs');
const p = require('path');



// create a Array from string
function range(val) {
  return val.split(',').map(Number);
}


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
      console.log(answer1);
      const FILE_TO_RECORD = new FileSet(answer1.input+ '/**/*.html');
      let questions2 = [
      {
        type: 'checkbox',
        name: 'files',
        message: 'Select banners to record',
        choices: FILE_TO_RECORD.files
      },
      {
        type: 'input',
        name: 'sizes',
        message: 'Enter all sizes of your banners: '
      },
      {
        type: 'input',
        name: 'ipAdress',
        message: 'Enter the ip adress used to run banners or enter for localhost: ',
        default: 'localhost'
      },
      {
        type: "input",
        name: 'portNumber',
        message: 'Enter port number used to run banners:',
        default: 8000
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

      // add dimension available for the banners
      recordBanner.addBannerSize(range(answer2.sizes));
    
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
        let pathToFile = answer2.files[i];
        await recordBanner.recordBanner(pathToFile,p.basename(answer1.input), answer2.portNumber,answer2.ipAdress, answer2.fpsV, answer2.fpsG, answer2.dest, answer2.optimize);
      }
    })
  })
}



main();

