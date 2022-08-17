import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
// detail 模块的小仓库
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit}, skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        console.log('产品添加到购物车',result);
        if(result.code==200){
            // 成功
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
    
}
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

// 对外暴露Store 类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}