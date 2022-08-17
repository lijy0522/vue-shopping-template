// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由配置
import routes from './routes'
// 引入store
import store from '@/store'


// 先把VueRouter 原型对象push|replace，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来的push|replace 方法，往哪里跳转以及传递哪些参数
// call||apply 区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call 传递参数用逗号隔开，apply 传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y:0}
    },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    // to：可以获取到你要跳转到那个路由信息
    // from：可以获取到你从那个路由而来的信息
    // next：放行函数
    // next()
    // 用户登录了才会有token，未登录一定不会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已经登录
    if(token){
        // 用户已经登录,去login 会停留在首页
        if(to.path=='/login'){
            next('/')
        }else{
            // 已经登录，跳转去其他页面
            if(name){
                // 如果用户名已有
                next()
            }else{
                // 没有用户信息，派发action 让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token 失效了
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录：不能去交易、支付相关的、以及个人中心
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        }else{
            // 其他
            next()
        }
        
    }
})

export default router