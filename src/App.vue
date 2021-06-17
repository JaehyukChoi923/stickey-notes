<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar app color="indigo" dark>
          <v-toolbar-title>Stickey Notes</v-toolbar-title>
        </v-app-bar>
        <v-main>
          <Board />
        </v-main>
        <v-footer color="indigo" app>
          <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import Board from "./components/Board";

export default {
  name: "App",
  components: {
    Board,
  },
  data: () => ({
  }),
};
</script>
