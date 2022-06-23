const http = require('http');
const port = process.env.PORT || 3000
fs = require('fs');
f= require('./put-files');
require('process');
minimist= require('minimist');
Web3Storage =require('web3.storage').Web3Storage;
getFilesFromPath= require('web3.storage').getFilesFromPath;
File = require('web3.storage').File;
global.b=false;
global.a="10";
var cors = require('cors')
var express = require('express');
var app = express();
app.use(cors())
const axios = require('axios').default



async function upload(rando) {
  const args = minimist(process.argv.slice(2))
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5MTQzNzEzMjc0RUNmZDJGQzVFZjVjZmI5NDU1NzY5YjY5RTE2OUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU2NDU4MDEwMDEsIm5hbWUiOiJzb2NpYWwgbWVkaWEifQ.9iwWem7JCQQiD_GCuq8VMucBwj0EBWfN3ZZ7ZiQIQ90"

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (3 < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  storage = new Web3Storage({ token })
  const response = await axios.get("https://images.hindustantimes.com/img/2022/01/12/550x309/vijay-deverakonda_1641969007967_1641969020517.jpg",  { responseType: 'arraybuffer' });
 buffer = Buffer.from(response.data, "utf-8");
fs.writeFile('myFile.jpg', buffer, (err) => {
  if(!err) console.log('Data written');
});
  const files = []
  const pathFiles = new File([buffer], 'myFile.jpg')
  files.push(pathFiles)

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added to:'+"https://dweb.link/ipfs/"+cid+"/"+"myFile.jpg")
  global.b=true;
  global.a="https://dweb.link/ipfs/"+cid+"/"+"myFile.jpg";
  return;
}

setTimeout(()=>{let server=app.get('/site', function (req, res) {
  
  const str1=req.query.url;
  console.log(str1);
  //this is link for the image
upload(str1);
if(!global.b){
  res.status(404).send("Oh uh, wait for file to upload  status code: "+res.statusCode);
    return;

}
  res.header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Accept");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(global.a);
  res.end();

}).listen(port);},1000);

