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
const MV_AREA: ['全部', '内地', '港台', '欧美', '日本', '韩国'] = ['全部', '内地', '港台', '欧美', '日本', '韩国'];
const MV_TYPE: ['全部', '官方版', '原生', '现场版', '网易出品'] = ['全部', '官方版', '原生', '现场版', '网易出品'];
const MV_ORDER: ['上升最快', '最热', '最新'] = ['上升最快', '最热', '最新']
// 歌手
const ARTIST_AREA = [{ label: '全部', val: -1 }, { label: '华语', val: 7 }, { label: '欧美', val: 96 }, { label: '日本', val: 8 }, { label: '韩国', val: 16 }, { label: '其他', val: 0 }];
const ARTIST_TYPE = [{ label: '全部', val: -1 }, { label: '男歌手', val: 1 }, { label: '女歌手', val: 2 }, { label: '乐队', val: 3 }];



/*********************** 搜索的类型 *************************/
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
const _IMG_SIZE = {
    small: 80,
    middle: 300,
    large: 600,
    aspect: 16 / 10,
    _get_params: (w: number, aspect: number) => `?param=${w}y${Math.ceil(w / aspect)}`

}
const IMG_SIZE_SEARCH_PARAMS = {
    squar: {
        small: _IMG_SIZE._get_params(_IMG_SIZE.small, 1),
        middle: _IMG_SIZE._get_params(_IMG_SIZE.middle, 1),
        large: _IMG_SIZE._get_params(_IMG_SIZE.large, 1),
    },
    rect: {
        small: _IMG_SIZE._get_params(_IMG_SIZE.small, _IMG_SIZE.aspect),
        middle: _IMG_SIZE._get_params(_IMG_SIZE.middle, _IMG_SIZE.aspect),
        large: _IMG_SIZE._get_params(_IMG_SIZE.large, _IMG_SIZE.aspect),
    },
}


// 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

// fee: enum,
// 0: 免费或无版权
// 1: VIP 歌曲
// 4: 购买专辑
// 8: 非会员可免费播放低音质，会员可播放高音质及下载
//   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
enum Fee {
    '免费或无版权' = 0,
    'VIP歌曲' = 1,
    '购买专辑' = 4,
    '可免费播放低音质' = 8
}

// 0删除 1发送 2回复 type: 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态

enum Comment_SOURCE_TYPE {
    歌曲 = 0, mv, 歌单, 专辑, 电台, 视频, 动态
}
enum Comment_ACTION_TYPE {
    删除 = 0, 发送, 回复
}


export default {
    IMG_SIZE_SEARCH_PARAMS,
    SEARCH_TYPE_ENUM,
    ALBUM_AREA,
    MV_AREA,
    MV_TYPE,
    MV_ORDER,
    ARTIST_AREA,
    ARTIST_TYPE, Fee,
    Comment_SOURCE_TYPE,
    Comment_ACTION_TYPE
}