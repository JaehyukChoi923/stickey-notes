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
          <div style="position:relative; margin:50px;">
            <!-- <div class="testmove" ref="parentEl">
              <movable class="modaltitle" target="parentEl"
                >modal behavior</movable
              >`
              <span>not movable</span>
            </div> -->
            <div v-for="(note, index) in notes" :key="index" @contextmenu.prevent="$refs.menu.open($event, 'Payload')">
            <!-- :posTop="note.top" :posLeft="note.left" -->
                  <Popper/>
      <ContextMenu ref="menu">
      <template slot-scope="{ contextData }">
        <ContextMenuItem @click.native="$refs.menu.close">
          Action 1 {{ contextData }}
        </ContextMenuItem>
         <ContextMenuItem @click.native="$refs.menu.close">
          Action 2 {{ contextData }}
        </ContextMenuItem>
        <ContextMenuItem @click.native="$refs.menu.close">
          Action 3 {{ contextData }}
        </ContextMenuItem>
         <ContextMenuItem @click.native="$refs.menu.close">
          Action 4 {{ contextData }}
        </ContextMenuItem>
      </template>
    </ContextMenu>
            <movable :id="note.idx" class="testmove" :posTop="note.top" :posLeft="note.left" 
             @complete="drop(note)"
              ><svg id="close" 
                style="width: 24px; height: 24px" 
                viewBox="0 0 24 24"
                @click="delNote(note)"
                disabled>
                  <path
                    fill="currentColor"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  />
                </svg>
              <span>{{ note.idx+'번 글' }}</span><br>
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
import ContextMenu from "./ContextMenu";
import ContextMenuItem from "./ContextMenuItem";

// import AddedNote from './AddedNote'
export default {
  name: "Board",
  components: {
    Note,
    ContextMenu,
    ContextMenuItem
    // AddedNote
  },
  data: () => {
    return {
      // ...mapState(["notes"]),
      tmpnotes: [1, 2]
    };
  },
  methods: {
    ...mapActions(['updateNote']),
    drop(note) {
      // note.idx => id
      console.log(note)
      // console.log(document.getElementById(note.idx).style.top)
      // console.log(document.getElementById(note.idx).style.left)
      console.log(note.posTop)
      let object = JSON.parse(localStorage.getItem(note.idx))
      // console.log(object)
      object.top = parseInt(document.getElementById(note.idx).style.top)
      object.left = parseInt(document.getElementById(note.idx).style.left)
      console.log(object)
      localStorage.setItem(object.idx, JSON.stringify(object));
      // this.$store.dispatch('getNotes')
    },
    delNote() {
      alert('삭제')
    }
  },
  computed: {
    ...mapGetters(["notes"])
  },
  mounted() {
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
#close:hover {
  color: red;
}
</style>