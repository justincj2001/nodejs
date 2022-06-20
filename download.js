http = require('http'); // or 'https' for https:// URLs
fs = require('fs');
f= require('./put-files');
require('process');
minimist= require('minimist');
Web3Storage =require('web3.storage').Web3Storage;
getFilesFromPath= require('web3.storage').getFilesFromPath;


const file = fs.createWriteStream("file1.jpg");
const request = http.get("http://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/agvtipa1dyverwpb_1648028803.jpeg", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
       upload();
   });
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
}




