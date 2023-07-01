// const createViewsDir = require('./createViewsDir.js')

const cp = require('child_process')

//生成项目views的目录
// createViewsDir()
cp.exec('../powershell/create_views.ps1')