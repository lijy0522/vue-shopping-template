import { reqGetSearchInfo } from "@/api"
// search 模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit}, params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

// 对外暴露Store 类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}