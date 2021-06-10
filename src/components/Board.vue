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
                    <v-textarea :value="note">
                    </v-textarea>
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
    this.$store.dispatch("getNotes")
  }
};
</script>

<style>
</style>