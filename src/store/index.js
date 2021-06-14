import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    MaxIdx: 0
  },
  getters: {
    notes: state => state.notes,
  },
  mutations: {
    setNotes(state, payload) {
      console.log('---setNotes---')
      console.log(payload)
      console.log(state.notes)
      if (payload in state.notes) {
        console.log("중복")
        return
      }
      state.notes.push(payload)
      // console.log(payload)
    }
  },
  actions: {
    addNote({commit, state}, payload) {
      state.MaxIdx += 1
      var object = {idx:state.MaxIdx, text:payload}
      commit('setNotes', JSON.stringify(object))
      localStorage.setItem(state.MaxIdx, JSON.stringify(object))
      // dispatch('getNotes')
    },
    updateNote() {

    },
    getNotes({commit, state}) {
      for(let i=0; i<localStorage.length; i++) {
        if (i > state.MaxIdx) {
          state.MaxIdx = i
        }
        let key = localStorage.key(i);
        console.log('---getNotes---')
        console.log('i:'+i)
        console.log('key:'+key)
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
