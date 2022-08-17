import Vue from 'vue'
import App from './App.vue'
import { MessageBox } from 'element-ui'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 引入轮播图全局组件
import Carousel from '@/components/Carousel'
// 引入分页器全局组件
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字。第二个参数：哪个组件。
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServer.js ----mock 数据
import '@/mock/mockServe'
// 引入swiper 样式
import 'swiper/css/swiper.css'
// 统一接收api 文件夹里面全部请求函数
import * as API from '@/api'

Vue.config.productionTip = false

// ElementUI 注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import gif from '@/assets/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:gif
})
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库，组件实例身上会多出一个属性$store 属性
  store
}).$mount('#app')
