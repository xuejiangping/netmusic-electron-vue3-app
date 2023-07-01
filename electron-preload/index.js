

function init_views_dir() {
  const cp = require('child_process')
  //生成项目views的目录
  // createViewsDir()
  cp.exec(' powershell ./powershell/create_views.ps1',(err) => {

    err && console.log('err',err.message)
  })
  // console.log(iconv.decode(Buffer.from(data,'binary'),'cp936'))
}


// init_views_dir()
