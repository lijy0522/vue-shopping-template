import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登录与注册模块
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 把仓库中相关用户信息清空
        state.token = ''
        state.userInfo = {}
        // 本地存储数据清空
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务 【token】
    async userLogin({commit}, data){
        let result = await reqUserLogin(data)
        // 服务器下发token，将来通过token 找服务器要用户信息进行展示
        if(result.code==200){
            // 用户已经登录成功并且获取到token
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}