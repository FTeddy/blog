import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseAxios = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: 'blogApp',
    articleDatas: '',
    postRedirect: false
  },
  mutations: {
    titleMut (state, data) {
      state.title = data
    },
    articleMut (state, data) {
      state.articleDatas = data
    },
    postRedirectMut (state, payload) {
      if (payload.status === true) {
        state.postRedirect = true
      } else {
        state.postRedirect = false
      }
    }
  },
  actions: {
    getArticles ({commit}) {
      baseAxios.get(`article/user/${localStorage.getItem('userID')}`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        commit('articleMut', serverRes.data.articles)
      })
    },
    postRedirectAct ({commit}, payload) {
      commit('postRedirectMut', payload)
    }
  }
})

export default store
