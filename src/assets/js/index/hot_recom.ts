import { getCurrentInstance, reactive, onMounted } from 'vue';

export default function hot_recom(playlist_params = { limit: 6, offset: 0, cat: '' }) {
    const { globalProperties: proxy } = getCurrentInstance()!.appContext.config


    // type a = Omit<Parameters<typeof proxy.$http.playList>['0'],'limit'|'offset'|'cat'>

    // -------------- 推荐歌单
    // 热门推荐歌单
    const playlist_info = reactive({
        playlist_hot_tags: [{ name: '流行' }],
        playlist_list: [] as any[],
        playlist_index: 0,
        playlist_params,
        playlist_count: 6,
        playlist_loading: false,
        playlist_currentPage: 1
    });

    const resetInfo = () => {
        // playlist_info.playlist_count=0
        playlist_info.playlist_currentPage = 1
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
        // 重置歌单列表为空
        // playlist_info['playlist_list'] = []
        resetInfo()
        getPlayList(playlist_info['playlist_params'])

    }

    // 分类歌单列表

    const getPlayList = async (params: Parameters<typeof proxy.$http.playList>['0']) => {
        playlist_info['playlist_loading'] = true;
        const { playlists, total } = await proxy.$http.playList(params)
        playlist_info['playlist_list'].push(...playlists)
        playlist_info['playlist_count'] = total
        playlist_info['playlist_loading'] = false;

    }

    onMounted(() => {
        getHotTags();
        getPlayList(playlist_info['playlist_params']);
    });

    const getMore = () => {
        playlist_info.playlist_params['offset'] = (++playlist_info.playlist_currentPage - 1) * playlist_params.limit
        return getPlayList(playlist_info['playlist_params'])
    }

    return {
        playlist_info,
        getHotTags,
        choosePlayListType,
        getMore
    }
}