import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

type RootState = {
  tagList: Tag[];
}

const store = new Vuex.Store({
  state: {
    tagList: [],
  } as RootState,
  mutations: {
    createTag(state, tag: Tag) {
      const ids = state.tagList.filter(item => item.id === tag.id)
      if (ids.length > 0) {
        window.alert('重复')
      } else {
        state.tagList.push(tag)
        store.commit('saveTags');
      }
    },
    saveTags(state) {
      const storageTagList = JSON.stringify(state.tagList)
      window.localStorage.setItem('tagList', storageTagList)
      // console.log(state.tagList)
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      // console.log(state.tagList)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store