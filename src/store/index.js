import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    MaxIdx: 0,
    used: [],
    selectedIdx: 0

  },
  getters: {
    notes: state => state.notes,
  },
  mutations: {
    setNotes(state, payload) {
      state.used.push(payload.idx)
      state.notes.push(payload)
    }
  },
  actions: {
    addNote({commit, state}, payload) {
      state.MaxIdx += 1
      localStorage.setItem('MaxIdx', state.MaxIdx)
      // object 만들고
      var object = {idx:state.MaxIdx, text:payload, top:10, left:200, background:'black'}
      // 로컬 스토리지에 저장
      localStorage.setItem(state.MaxIdx, JSON.stringify(object))

      commit('setNotes', JSON.parse(localStorage.getItem(state.MaxIdx)))
    },
    getNotes({commit, state}) {
      for(let i=0; i<localStorage.length+10; i++) {
        let key = localStorage.key(i);
        if (key <= localStorage.length+10) {
          commit('setNotes', JSON.parse(localStorage.getItem(key)))
        }   
      }
      state.MaxIdx += 1
    }
  },
  
  modules: {
  }
})
