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
      // console.log('---setNotes---시작')
      // console.log(payload)
      // console.log(payload.idx)
      state.used.push(payload.idx)
      
      
      // console.log(document.getElementById(payload.idx))
      // console.log('---setNotes---')
      // console.log(state.notes)
      // if (!(payload.idx in state.used)) {
      //   state.used.push(payload.idx)
      // } else {
      //   console.log('중복')
      //   return
      // }
      
      state.notes.push(payload)
      // console.log(payload)
    }
  },
  actions: {
    addNote({commit, state}, payload) {
      state.MaxIdx += 1
      // object 만들고
      var object = {idx:state.MaxIdx, text:payload, top:10, left:200}
      // 스토어에 저장
      // commit('setNotes', object)
      // commit('setNotes', object)
      // 로컬 스토리지에 저장
      localStorage.setItem(state.MaxIdx, JSON.stringify(object))
      // console.log(JSON.parse(localStorage.getItem(state.MaxIdx)))
      commit('setNotes', JSON.parse(localStorage.getItem(state.MaxIdx)))
    },
    updateNote(payload) {
      // let object = JSON.parse(localStorage.getItem(payload.idx))
      // console.log(localStorage.getItem(payload.idx))
      console.log(payload)
    },
    getNotes({commit, state}) {
      for(let i=0; i<localStorage.length; i++) {
        if (i > state.MaxIdx) {
          state.MaxIdx = i
        }
        let key = localStorage.key(i);
        // console.log('---getNotes---')
        // console.log('i:'+i)
        // console.log('key:'+key)
        // console.log(`${key}: ${localStorage.getItem(key)}`);
        if (key <= localStorage.length) {
          commit('setNotes', JSON.parse(localStorage.getItem(key)))
          console.log(key)
          var tmp = String(key)
          console.log(tmp)
          console.log(document.getElementById(tmp))
        }
        
      }
    }
  },
  
  modules: {
  }
})
