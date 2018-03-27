import Vue from 'vue'
import Router from 'vue-router'
import Searcher from '@/components/Searcher'
import Carousel from '@/components/Carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Searcher',
      component: Searcher
    },
    {
      path: '/carousel',
      name: 'Carousel',
      component: Carousel
    }
  ]
})
