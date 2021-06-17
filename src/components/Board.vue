<template>
  <div>
    <v-row>
      <v-col cols="3" class="mt-3">
        <h3>새 노트를 추가해보세요.</h3>
        <Note />
      </v-col>
      <v-row>
        <v-col cols="9" class="mt-3">
          <h3>노트 목록</h3>
          <Context
            ref="context-menu"
            @deleteNote="deleteNote($store.state.selectedIdx)"
            @changeRed="changeRed($store.state.selectedIdx)"
            @changeGreen="changeGreen($store.state.selectedIdx)"
            @changeBlack="changeBlack($store.state.selectedIdx)"
          />
          <div style="position: relative; margin: 50px">
            <div
              v-for="(note, index) in notes"
              :key="index"
              @contextmenu.prevent="$refs['context-menu'].$refs.menu.open"
            >
              <!-- context menu 를 방지할수있는 지시어 -->
              <!-- 이 .prevent 는 Vue 에서 제공하는 것으로, e.preventDefault 를 대체해준다. -->
              <movable
                :id="note.idx"
                class="testmove"
                :posTop="note.top"
                :posLeft="note.left"
                @start="select(note.idx)"
                @complete="drop(note)"
                :style="[
                  {
                    'background': note.background,
                  },
                  swatchStyle(note.background),
                ]"
                ><svg
                  id="close"
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                  @click="delNote(note)"
                  disabled
                >
                  <path
                    fill="currentColor"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  />
                </svg>
                <span>{{ note.idx + "번 노트" }}</span>
                <br />
                <span>{{ note.text }}</span></movable
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Note from "./Note";
import Context from "./Context";
// import ContextMenu from "./ContextMenu";
// import ContextMenuItem from "./ContextMenuItem";

// import AddedNote from './AddedNote'
export default {
  name: "Board",
  components: {
    Note,
    Context,
    // ContextMenu,
    // ContextMenuItem
    // AddedNote
  },
  data: () => {
    return {
      // ...mapState(["notes"]),
      tmpnotes: [1, 2],
    };
  },
  methods: {
    ...mapActions(["updateNote"]),
    drop(note) {
      // note.idx => id
      console.log(note);
      // console.log(document.getElementById(note.idx).style.top)
      // console.log(document.getElementById(note.idx).style.left)
      console.log(note.posTop);
      let object = JSON.parse(localStorage.getItem(note.idx));
      // console.log(object)
      object.top = parseInt(document.getElementById(note.idx).style.top);
      object.left = parseInt(document.getElementById(note.idx).style.left);
      console.log(object);
      localStorage.setItem(object.idx, JSON.stringify(object));
      // this.$store.dispatch('getNotes')
    },
    deleteNote(idx) {
      // alert(idx+"번 삭제");
      localStorage.removeItem(idx);
      this.$store.state.notes = [];
      this.$store.MaxIdx += 1;
      this.$store.dispatch("getNotes");
    },
    select(idx) {
      this.$store.state.selectedIdx = idx;
    },
    changeRed(idx) {
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'red'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
    changeGreen(idx) {
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'green'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
    changeBlack(idx) {
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'black'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
    swatchStyle(color) {
      return {background: color}
    }
  },
  computed: {
    ...mapGetters(["notes"]),
  },
  mounted() {
    // this.$store.state.MaxIdx += 1
    this.$store.state.notes = [];
    console.log("새로고침");
    console.log("lS값 가져오기: " + parseInt(localStorage.getItem("MaxIdx")));
    if (parseInt(localStorage.getItem("MaxIdx").isNaN)) {
      console.log("ls에 값 없음");
      this.$store.state.MaxIdx = 0;
    } else {
      this.$store.state.MaxIdx = parseInt(localStorage.getItem("MaxIdx"));
    }
    this.$store.dispatch("getNotes");
    // localStorage.setItem('MaxIdx', 0)
  },
};
</script>

<style>
.testmove {
  display: block;
  position: absolute;
  top: 0;
  height: 150px;
  width: 150px;
  margin: 200px;
  background: #333;
  color: white;
}
.modaltitle {
  background: blue;
  display: block;
  width: 100%;
  color: white;
}
#close:hover {
  color: red;
}
</style>