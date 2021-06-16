<template>
  <div id="app">
    <!-- <ContextMenu ref="menu">
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
    </ContextMenu> -->
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar app color="indigo" dark>
          <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
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
// import HelloWorld from './components/HelloWorld';
import Board from "./components/Board";
// import ContextMenu from "./components/ContextMenu";
// import ContextMenuItem from "./components/ContextMenuItem";

export default {
  name: "App",

  components: {
    Board,
    // ContextMenu,
    // ContextMenuItem,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
