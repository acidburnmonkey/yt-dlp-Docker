import fs from 'fs/promises';

export const readFiles = async () => {
  //map validation
  function isVideoFile(arg) {
    if (arg.toString().endsWith('.css')) {
      return true;
    } else {
      return false;
    }
  }
  //read
  const rootPath = '.';
  let files = await fs.readdir(rootPath);
  files = files.filter(isVideoFile);

  //append ojects to return
  const objList = [];
  for (let i = 0; i < files.length; i++) {
    let fileStats = await fs.stat(files[i]);
    objList.push({
      id: i,
      name: files[i],
      mDate: new Date(fileStats.mtime).toLocaleDateString(),
    });
  }
  return objList;
};

console.log(await readFiles());

////template
//const fileObj = [
//  {
//    id: 1,
//    name: "filename",
//    date: "modDate",
//  },
//];
