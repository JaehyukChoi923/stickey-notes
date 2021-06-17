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
      var object = {idx:state.MaxIdx, text:payload, top:10, left:200}
      // 스토어에 저장

      // 로컬 스토리지에 저장
      localStorage.setItem(state.MaxIdx, JSON.stringify(object))

      commit('setNotes', JSON.parse(localStorage.getItem(state.MaxIdx)))
    },
    // updateNote(payload) {
    //   // let object = JSON.parse(localStorage.getItem(payload.idx))
    //   // console.log(localStorage.getItem(payload.idx))
    //   console.log(payload)
    // },
    getNotes({commit, state}) {
      for(let i=0; i<localStorage.length+10; i++) {
        if (i > state.MaxIdx) {
          // state.MaxIdx = i
        }
        let key = localStorage.key(i);

        if (key <= localStorage.length+10) {
          commit('setNotes', JSON.parse(localStorage.getItem(key)))
          console.log('key :'+key)
          var tmp = String(key)
          console.log(tmp)
          console.log(document.getElementById(tmp))
        }
        
      }
      state.MaxIdx += 1
    }
  },
  
  modules: {
  }
})
