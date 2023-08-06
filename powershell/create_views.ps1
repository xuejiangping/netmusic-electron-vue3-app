# 
#   该脚本 可根据 src/router 目录下的views_dir.json 自动生成views目录中的文件
#   当前目录下的 test_view_dir.json 为测试的 文件可删除
#   注意千万不要覆盖自己写好的文件 ！！！
#   

$path = $PSCommandPath | Split-Path 
Set-Location $path

function _vue_template_str($msg) {
  @"
  <script setup lang="ts">
  
  </script>

  <template>
  <div>${msg}</div>
  </template>

  <style scoped lang="less">
  
  </style>
"@
} 

function _page_js_str($msg, $i) {
  @"
  export default { name:$msg,menuOrder:$i }
"@
}


$order = 0
$out_items = ('Name', 'Mode', 'CreationTime', 'FullName')
function _main {
  param (
    [array] $list,
    $root
  )
  
  $list.ForEach({
      $name = $_.name
      $dirPath = Join-Path $root $name
      if (-not (Test-Path $dirPath)) { mkdir  $dirPath | Select-Object $out_items }

      if (-not (Test-Path $dirPath/'index.vue')) {
        New-Item $dirPath/'index.vue' -Value (_vue_template_str $name ) | Select-Object $out_items
      }
      if (-not (Test-Path $dirPath/'page.ts')) {
        New-Item $dirPath/'page.ts' -Value (_page_js_str  $name $order++) | Select-Object $out_items
      }
      if ($_.children) {
        _main -list $_.children -root $dirPath
      }
    })
  
}

$list = Get-Content '../src/router/views_dir.json' | ConvertFrom-Json 

# _main  -list $list[2] -root '.'

# Join-Path -Path $path -ChildPath '../src/views/' | Convert-Path | Write-Output
_main  -list $list -root '../src/views/'
