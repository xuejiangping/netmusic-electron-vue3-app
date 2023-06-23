import { getCurrentInstance, reactive, onMounted } from 'vue';

export default function hot_recom() {
    const proxy = getCurrentInstance()?.appContext.config.globalProperties
    if (proxy === undefined) return false
    type MVReqParams = Parameters<typeof proxy.$http.mv>['0']
    interface MV_INFO {
        mv_area: typeof proxy.$COMMON.MV_AREA,
        mv_list: any[],
        mv_index: number,
        mv_params: MVReqParams,
        mv_count: number,
        mv_loading: boolean
    }

    // MV
    const mv_info = reactive<MV_INFO>({
        mv_area: proxy.$COMMON.MV_AREA,
        mv_list: [],
        mv_index: 0,
        mv_params: { limit: 10, area: '' },
        mv_count: 10,
        mv_loading: true
    })

    // 最新MV
    const getMv = async (params: MVReqParams) => {
        const { res } = await proxy.$http.mv(params)

        if (res.code !== 200) {
            return proxy.$msg.error('数据请求失败')
        }

        mv_info['mv_list'] = res.data;
        mv_info['mv_loading'] = false;
    }

    // 切换MV类别
    const chooseMvType = (index: number) => {
        mv_info['mv_index'] = index;
        mv_info['mv_params']['area'] = index !== 0 ? mv_info['mv_area'][index] : '';
        mv_info['mv_loading'] = true;
        getMv(mv_info['mv_params']);
    }

    onMounted(() => {
        getMv(mv_info['mv_params']);
    });

    return {
        mv_info,
        chooseMvType,
    }
}