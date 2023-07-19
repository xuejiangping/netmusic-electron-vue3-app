import { getCurrentInstance, reactive, onMounted } from 'vue';

export default function hot_recom(playlist_params = { limit: 5, offset: 0, cat: '' }) {
    const proxy = getCurrentInstance()?.proxy!



    // -------------- 推荐歌单
    // 热门推荐歌单
    const playlist_info = reactive({
        playlist_hot_tags: [{ name: '流行' }],
        playlist_list: [] as any[],
        playlist_index: 0,
        playlist_params,
        playlist_count: 6,
        playlist_loading: false,
    });

    const resetInfo = () => {
        playlist_info.playlist_list = []
    }
    // 获取热门推荐歌单标签
    const getHotTags = async () => {
        const res = await proxy.$http.hotList()
        playlist_info['playlist_hot_tags'] = res.tags
    }
    // 切换歌单类别
    const choosePlayListType = async (index: number) => {
        playlist_info['playlist_index'] = index;
        playlist_info['playlist_params']['cat'] = playlist_info['playlist_hot_tags'][index].name
        resetInfo()
        more()

    }

    // 分类歌单列表

    const getPlayList = async (params: Parameters<typeof proxy.$http.playList>['0']) => {
        const { playlists, total } = await proxy.$http.playList(params)
        playlist_info['playlist_list'].push(...playlists)
        playlist_info['playlist_count'] = total
    }

    onMounted(() => {
        proxy.$utils2.loading([getHotTags(), more()])
    });

    const _getMore = proxy.$utils2.getMoreHandler(getPlayList, 500)
    const more = () => _getMore(playlist_info['playlist_params'])

    return {
        playlist_info,
        getHotTags,
        choosePlayListType,
        more
    }
}