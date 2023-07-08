import { getCurrentInstance, reactive, onMounted } from 'vue';

export default function () {
    const proxy = getCurrentInstance()!.appContext.config.globalProperties
    type MVReqParams = Parameters<typeof proxy.$http.mv>['0']
    interface MV_INFO {
        mv_area: typeof proxy.$COMMON.MV_AREA,
        mv_type: typeof proxy.$COMMON.MV_TYPE,
        mv_order: typeof proxy.$COMMON.MV_ORDER,
        mv_list: any[],
        mv_area_index: number,
        mv_type_index: number,
        mv_order_index: number,
        // mv_params: MVReqParams,
        mv_count: number,
        mv_loading: boolean,
        currentPage: number,
        limit: number
    }

    // MV
    const mv_info = reactive<MV_INFO>({
        mv_area: proxy.$COMMON.MV_AREA,
        mv_type: proxy.$COMMON.MV_TYPE,
        mv_order: proxy.$COMMON.MV_ORDER,
        mv_list: [],
        mv_count: 0,
        mv_loading: true,
        currentPage: 1,
        mv_area_index: 0,
        mv_type_index: 0,
        mv_order_index: 0,
        limit: 10
    })

    const part_params = computed(() => {
        const { mv_area, mv_type, mv_order, mv_area_index, mv_type_index, mv_order_index } = mv_info
        return {
            area: mv_area[mv_area_index],
            type: mv_type[mv_type_index],
            order: mv_order[mv_order_index],
        }
    })
    // 最新MV
    const getMv = async (params: MVReqParams, isPagination = false) => {
        mv_info['mv_loading'] = true;
        const res = await proxy.$http.mv(params)
        mv_info['mv_list'] = res.data;
        if (!isPagination) mv_info['mv_count'] = res.count
        mv_info['mv_loading'] = false;
    }

    const mv_params = computed(() => {
        const { currentPage, limit } = mv_info
        return { ...part_params.value, offset: (currentPage - 1) * limit, limit }
    })

    watch(part_params, (newVal) => {
        console.log('newVal', newVal)
        mv_info.currentPage = 1
        // debugger
        getMv(mv_params.value)
    })
    watch(() => mv_info.currentPage, () => getMv(mv_params.value, true))
    onMounted(() => {
        getMv(mv_params.value);
    });

    return {
        mv_info
    }
}