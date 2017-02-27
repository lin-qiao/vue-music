import Vue from 'vue'
import Router from 'vue-router'
import MusicCharts from 'components/MusicCharts'
import SongList from 'components/SongList'
//告诉vue 使用vueRouter
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicCharts',
      component: MusicCharts
    },
    {
      path:'/song-list',
      name:'SongList',
      component: SongList
    }
  ]
})
