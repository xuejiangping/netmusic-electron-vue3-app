# Get-Content -Path views_dir.json | let a
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


$i = 0

function _main {
  param (
    [array] $list,
    $root
  )
  
  $list.ForEach({
      $name = $_.name
      $dirPath = Join-Path $root $name
      if (-not (Test-Path $root/$name)) { mkdir  $dirPath }

      if (-not (Test-Path $dirPath/'index.vue')) {
        New-Item $dirPath/'index.vue' -Value (_vue_template_str $name )
      }
      if (-not (Test-Path $dirPath/'page.ts')) {
        New-Item $dirPath/'page.ts' -Value (_page_js_str "'$name'" ($i++))
      }
      if ($_.children) {
        _main -list $_.children -root $dirPath
      }
    })
  
}

$list = Get-Content $path/'views_dir.json' | ConvertFrom-Json 

_main  -list $list[2] -root '.'

