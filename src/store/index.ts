import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

type RootState = {
  toastMessage: string;
  tagList: Tag[];
}

const store = new Vuex.Store({
  state: {
    toastMessage: '',
    tagList: [],
  } as RootState,
  mutations: {
    // toastMessage方法
    updateToastMessage(state, message) {
      state.toastMessage = message
    },
    // tagList方法
    createTag(state, tag: Tag) {
      const ids = state.tagList.filter(item => item.id === tag.id)
      if (ids.length > 0) {
        // 给toast添加文字
        store.commit('updateToastMessage', `标签:${tag.name} 重复`)
      } else {
        state.tagList.push(tag)
        store.commit('saveTags');
        // 给toast添加文字
        store.commit('updateToastMessage', `标签:${tag.name} 已添加`)
      }
    },
    deleteTag(state, id: number) {
      const tag = state.tagList.filter(item => item.id === id)
      const ids = state.tagList.map(item => item.id)
      const index = ids.indexOf(id)
      state.tagList.splice(index, 1)
      store.commit('saveTags')
      // 给toast添加文字
      store.commit('updateToastMessage', `标签:${tag[0].name} 已删除`)
    },
    saveTags(state) {
      const storageTagList = JSON.stringify(state.tagList)
      window.localStorage.setItem('tagList', storageTagList)
      // console.log(state.tagList)
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      // console.log(state.tagList)
    },
    // recordList方法
    saveRecord() {
      console.log('hi')
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store