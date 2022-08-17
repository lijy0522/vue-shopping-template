import {reqCategoryList, reqBannerList, reqFloorList} from '@/api'
// home 模块的小仓库
// state：仓库存储数据的地方
const state = {
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // floor 数据
    floorList:[],
}
// mutations：修改state 的唯一手段
const mutations = {
    GATCATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
}
// actions：可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API 里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit('GATCATEGORYLIST',result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqBannerList()
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor 数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露Store 类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}