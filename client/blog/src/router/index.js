import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Article from '@/components/pages/Article'
import ArticleItem from '@/components/article/ArticleItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article',
      component: Article,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('jwtToken')) {
          next('/')
        } else {
          next()
        }
      },
      children: [
        {
          path: ':articleId',
          name: 'ArticleItem',
          props: true,
          component: ArticleItem
        }
      ]
    }
  ]
})
