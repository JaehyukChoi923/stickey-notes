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
            <div class="testmove" ref="parentEl">
              <movable class="modaltitle" target="parentEl"
                >modal behavior</movable
              >`
              <span>not movable</span>
            </div>
            <movable class="testmove" posTop="444" :grid="20"
              ><span>grid:20</span></movable
            >
            <movable class="testmove" posTop="222" posLeft="222" shiftKey="true"
              ><span>Shift Key Behavior</span></movable
            >
            <movable class="testmove" posLeft="444" :bounds="{ x: [0, 0] }"
              ><span>bounds:only y</span></movable
            >
            <movable
              class="testmove"
              posTop="444"
              posLeft="444"
              :bounds="{ y: [0, 0] }"
              ><span>bounds:only x</span></movable
            >
          </div>
          <!-- <AddedNote v-for="(note, index) in notes" :key="index"/> -->
          <v-container fluid v-for="(note, index) in notes" :key="index">
            <v-row>
              <!-- sm="12" md="6" -->
              <v-col>
                <v-card style="height: 40%; width:40%">
                  <v-toolbar>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                  </v-toolbar>
                  <v-card-text
                    style="height: 300px; border:solid;"
                    class="grey lighten-5"
                  >
                    <v-textarea :value="note"> </v-textarea>
                    <p>{{ index }}</p>
                  </v-card-text>
                  <v-card-text style="height: 10px; position: relative ">
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["notes"])
  },
  mounted() {
    this.$store.dispatch("getNotes");
  }
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