const fs = require('fs')

const dirCache={}

const writeFileByUser  = (filePath, data, cb) =>{
  if (!fs.existsSync(filePath)) {
    mkdir(filePath, data, cb)
  }
}

const mkdir = (filePath, data, cb) => {
  const arr=filePath.split('\\')
  let dir=arr[ 0 ]
  for(let i=1;i<arr.length;i++){
    if(!dirCache[ dir ]&&!fs.existsSync(dir)){
      dirCache[ dir ]=true
      fs.mkdirSync(dir)
    }
    dir=dir+'/'+arr[ i ]
  }
  fs.writeFile(filePath, data, cb)
}


const deleteAll = (path) => {
  var files = []
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file) {
      var curPath = path + "/" + file
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteAll(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}


module.exports = { writeFileByUser, deleteAll }
