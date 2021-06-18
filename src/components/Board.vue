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
            @changeBackground="changeBackground"
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
                :style="{ background: note.background }"
              >
              <!-- event.preventDefault();  -->
                <svg
                @click="deleteNote(note.idx)"
                class="closebtn" 
                style="width: 24px; height: 24px;" viewBox="0 0 24 24">
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
    return {};
  },
  methods: {
    drop(note) {
      // localStoarge에 변경 위치를 저장
      let object = JSON.parse(localStorage.getItem(note.idx));

      object.top = parseInt(document.getElementById(note.idx).style.top);
      object.left = parseInt(document.getElementById(note.idx).style.left);

      localStorage.setItem(object.idx, JSON.stringify(object));
    },
    deleteNote(idx) {
      localStorage.removeItem(idx); // localStorage에서 지워주고
      this.$store.state.notes = []; // notes초기화 후
      this.$store.MaxIdx += 1;
      this.$store.dispatch("getNotes"); // 다시 불러옴.
    },
    select(idx) {
      // v-movable의 start event 사용.
      this.$store.state.selectedIdx = idx;
      // movable 안에 다른 버튼을 둘 수 없어서
      // movable 밖에 만들고, start event로 idx 저장.
    },
    changeBackground(color) {
      let object = JSON.parse(localStorage.getItem(this.$store.state.selectedIdx));
      object.background = color
      localStorage.setItem(this.$store.state.selectedIdx, JSON.stringify(object));
      this.$store.state.notes = [];
      this.$store.dispatch("getNotes");
    }
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
.closebtn:hover {
  color: red;
}
</style>