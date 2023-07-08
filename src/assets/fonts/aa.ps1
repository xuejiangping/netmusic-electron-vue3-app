$path = $PSCommandPath | Split-Path -Parent

cd $path
$a = sls -Path './fonts.css' -Pattern  '\.(icon-.+?):'
$i = 0
$b = $a.Matches.Groups.Value.Where({ $i++ % 2 -ne 0 })
$c = ''
$b.forEach({ $c += "<div>$_ : <i class='iconfont $_'></i></div> " })

$d = '../../views/index/index.vue' 
gc -Path $d | let e
$e -match '<template>(.*?)</template>'

