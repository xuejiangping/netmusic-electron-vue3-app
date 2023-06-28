//==========================================================
//
//
//        一些业务相关常量
//
//
//==========================================================

// 专辑
const ALBUM_AREA = [{ name: '全部', code: 'all' }, { name: '华语', code: 'zh' }, { name: '欧美', code: 'ea' }, { name: '韩国', code: 'kr' }, { name: '日本', code: 'jp' }];

// MV
const MV_AREA = ['全部', '内地', '港台', '欧美', '日本', '韩国'];
const MV_TYPE = ['全部', '官方版', '原生', '现场版', '网易出品'];

// 歌手
const ARTIST_AREA = [{ label: '全部', val: -1 }, { label: '华语', val: 7 }, { label: '欧美', val: 96 }, { label: '日本', val: 8 }, { label: '韩国', val: 16 }, { label: '其他', val: 0 }];
const ARTIST_TYPE = [{ label: '全部', val: -1 }, { label: '男歌手', val: 1 }, { label: '女歌手', val: 2 }, { label: '乐队', val: 3 }];


const SEARCH_TYPE_ENUM: {
    '单曲': 1,
    '歌手': 100,
    '视频': 1004,
    '专辑': 10,
    '歌单': 1000,
} = {
    '单曲': 1,
    '歌手': 100,
    '视频': 1004,
    '专辑': 10,
    '歌单': 1000,
}
const IMG_SMALL_SIZE_SEARCH_PARAMS = '?param=100y100'

export default {
    IMG_SMALL_SIZE_SEARCH_PARAMS,
    SEARCH_TYPE_ENUM,
    ALBUM_AREA,
    MV_AREA,
    MV_TYPE,
    ARTIST_AREA,
    ARTIST_TYPE
}
// 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合