const fs = require('fs');
const os = require("os");

console.log(os.cpus.length);


// this will create file syncronsly 
// fs.writeFileSync('./test.txt','hey there');


//this will create file asyncronously

// fs.writeFile('./test.txt','hey there async',(error) => {});


//sync method for reading file

// const result = fs.readFileSync('./contact.txt','utf-8');
// console.log(result);

// async method for reading file (it dosent return any result to the variable this will return result to the callback)
// callback have two parameters first one is for error and second one is for result

// fs.readFile('./contact.txt','utf-8',(error,result) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// })

fs.appendFileSync("./test.txt","hey there\n");


// fs.cpSync("./test.txt","./copy.txt");
//fs.unlinkSync("./copy.txt")   // for deleting a file