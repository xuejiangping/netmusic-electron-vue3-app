
const cp = require('child_process')
function init_views_dir() {
  //生成项目views的目录
  // createViewsDir()
  const work_process = cp.spawn('powershell',['./powershell/create_views.ps1'])
  work_process.on('error',(err) => console.log('err',err.message))
  // console.log(iconv.decode(Buffer.from(data,'binary'),'cp936'))
}


// init_views_dir()
