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
              <!-- context menu 를 방지할 수 있는 지시어 -->
              <!-- 이 .prevent 는 Vue 에서 제공하는 것으로, e.preventDefault 를 대체해준다. -->
              <movable
                :id="note.idx"
                class="testmove"
                :posTop="note.top"
                :posLeft="note.left"
                @start="select(note.idx)"
                @complete="drop(note)"
                :style="{ 'background': note.background }">
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
import { mapGetters } from "vuex";
import Note from "./Note";
import Context from "./Context";

export default {
  name: "Board",
  components: {
    Note,
    Context,
  },
  data: () => {
    return {
    };
  },
  methods: {
    drop(note) { // localStoarge에 변경 위치를 저장
      let object = JSON.parse(localStorage.getItem(note.idx));

      object.top = parseInt(document.getElementById(note.idx).style.top);
      object.left = parseInt(document.getElementById(note.idx).style.left);

      localStorage.setItem(object.idx, JSON.stringify(object));
    },
    deleteNote(idx) { 
      localStorage.removeItem(idx); // localStorage에서 지워주고
      this.$store.state.notes = [];  // notes초기화 후
      this.$store.MaxIdx += 1;
      this.$store.dispatch("getNotes"); // 다시 불러옴.
    },
    select(idx) { // v-movable의 start event 사용.
      this.$store.state.selectedIdx = idx;
      // movable 안에 다른 버튼을 둘 수 없어서
      // movable 밖에 만들고, start event로 idx 저장.
    },
    changeRed(idx) { // 노트 배경색 바꾸기(빨강)
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'red'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
    changeGreen(idx) { // 노트 배경색 바꾸기(녹색)
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'green'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
    changeBlack(idx) { // 노트 배경색 바꾸기(검정)
      let object = JSON.parse(localStorage.getItem(idx))
      object.background = 'black'
      localStorage.setItem(idx, JSON.stringify(object))
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    },
  },
  computed: {
    ...mapGetters(["notes"]),
  },
  created() {
    this.$store.state.notes = [];
    if (parseInt(localStorage.getItem("MaxIdx").isNaN)) {
      this.$store.state.MaxIdx = 0;
    } else {
      this.$store.state.MaxIdx = parseInt(localStorage.getItem("MaxIdx"));
    }
    this.$store.dispatch("getNotes");
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
</style>