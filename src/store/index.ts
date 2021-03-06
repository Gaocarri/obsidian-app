import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import dayjs from 'dayjs'

import clone from '@/lib/clone'
import createNumberId from '@/lib/createNumberId'


Vue.use(Vuex)

type RootState = {
  toastMessage: string;
  tagList: Tag[];
  recordList: RecordItem[];
  currentMonth: number;
  currentYear: number;
}

const store = new Vuex.Store({
  state: {
    toastMessage: '',
    tagList: [],
    recordList: [],
    currentMonth: dayjs().month() + 1,
    currentYear: dayjs().year(),
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
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      record2.numberId = createNumberId()
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    editRecord(state, record) {
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].numberId == record.numberId) {
          state.recordList[i].amount = record.amount
          state.recordList[i].notes = record.notes
          break
        }
      }
      store.commit('saveRecords')
    },
    deleteRecord(state, id) {
      let index: number = -1
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].numberId == id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.recordList.splice(index, 1)
      }
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    // 更改明细页显示年月
    editMonth(state, m) {
      state.currentMonth = m
    },
    editYear(state, y) {
      state.currentYear = y
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store