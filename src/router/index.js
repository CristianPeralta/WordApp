import Vue from 'vue'
import Router from 'vue-router'
import Searcher from '@/components/Searcher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Searcher',
      component: Searcher
    }
  ]
})
