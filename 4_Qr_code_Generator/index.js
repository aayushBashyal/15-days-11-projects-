// import inquirer from "inquirer";
import qr from 'qr-image'
import fs from 'fs'
import inquirer from 'inquirer';
import { url } from 'inspector';

inquirer
  .prompt([{

      message: "Enter the URL to convert:", 
      default: "Made with <3 by Aayush ",
      name: "URL"
  }
  ])
  .then((answers) => {
    const URL = answers.URL;
    var qr_svg = qr.image(URL);
    qr_svg.pipe(fs.createWriteStream('qr.png'));

    fs.writeFile('url.txt', URL, err => {
        if(err) throw err 
        console.log("file saved");
        
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });