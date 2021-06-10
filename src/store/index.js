import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    MaxIdx: 1
  },
  getters: {
    notes: state => state.notes,
  },
  mutations: {
    setNotes(state, payload) {
      state.notes.push(payload)
    }
  },
  actions: {
    addNote({commit, state}, payload) {
      console.log(payload)
      commit('setNotes', payload)
      localStorage.setItem(state.MaxIdx, payload)
      state.MaxIdx += 1
    },
    getNotes({commit, state}) {
      for(let i=0; i<localStorage.length; i++) {
        if (i > state.MaxIdx) {
          state.MaxIdx = i
        }
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
        if (key <= localStorage.length) {
          commit('setNotes', localStorage.getItem(key))
        }
        
      }
    }
  },
  
  modules: {
  }
})
