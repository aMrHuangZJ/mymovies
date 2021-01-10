// 三大底部导航页面路由
import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  movieRouter,
  mineRouter,
  cinemaRouter,
  {
    path : '/*',
    redirect : '/movie'//当输入网址没有对应界面时跳转到电影页
  }
  ]
})