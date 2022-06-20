const http = require('http');
const port = process.env.PORT || 4000
fs = require('fs');
f= require('./put-files');
require('process');
minimist= require('minimist');
Web3Storage =require('web3.storage').Web3Storage;
getFilesFromPath= require('web3.storage').getFilesFromPath;


const server = http.createServer((req, res) => {
  str1="req.url.substring(1);"
  console.log(req.url.substring(1));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  const file = fs.createWriteStream("file1.jpg");
const request = http.get(req.url.substring(1), function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       upload();
       
   });
});

});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});




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
  const pathFiles = await getFilesFromPath("file1.jpg")
  files.push(...pathFiles)

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)
  return cid
}