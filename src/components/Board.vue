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
            <div>
              
            <movable :id="index" class="testmove" posTop="10" 
            v-for="(note, index) in notes" :key="index" @complete="test(note)"
              >
              <span>{{ note }}</span></movable
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
// import AddedNote from './AddedNote'
export default {
  name: "Board",
  components: {
    Note
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
    test() {
      // alert(note.idx)
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
</style>