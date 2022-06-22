const http = require('https');
const port = process.env.PORT || 3000
fs = require('fs');
f= require('./put-files');
require('process');
minimist= require('minimist');
Web3Storage =require('web3.storage').Web3Storage;
getFilesFromPath= require('web3.storage').getFilesFromPath;
global.b=false;
global.a="10";
var cors = require('cors')
var express = require('express');
var app = express();
app.use(cors())

async function upload() {
  const args = minimist(process.argv.slice(2))
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5MTQzNzEzMjc0RUNmZDJGQzVFZjVjZmI5NDU1NzY5YjY5RTE2OUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU2NDU4MDEwMDEsIm5hbWUiOiJzb2NpYWwgbWVkaWEifQ.9iwWem7JCQQiD_GCuq8VMucBwj0EBWfN3ZZ7ZiQIQ90"

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (3 < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  storage = new Web3Storage({ token })
  const files = []
  const pathFiles = await getFilesFromPath("image1.jpg")
  files.push(...pathFiles)

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)
  global.b=true;
  global.a="https://dweb.link/ipfs/"+cid+"/image1.jpg";
}

app.get('/site', function (req, res) {
  const file = fs.createWriteStream("image1.jpg");
  const str1=req.query.url;
  console.log(str1);
  //this is link for the image
const request = http.get(str1, function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       upload();
       
   });
});
if(!global.b){
  res.status(500).send("Oh uh, wait for file to upload  status code: "+res.statusCode);
}
  res.header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Accept");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(global.a);
  res.end();
  

}).listen(port);
