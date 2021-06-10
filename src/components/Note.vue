<template>
  <v-container fluid>
    <v-row>
      <!-- sm="12" md="6" -->
      <v-col>
        <v-card style="height: 40%">
          <v-toolbar>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-toolbar>
          <v-card-text style="height: 300px; border:solid;" class="grey lighten-5">
            <v-textarea v-model="new_text">
            </v-textarea>
          </v-card-text>
          <v-card-text style="height: 10px; position: relative ">
            <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Note',
    components: {

    },

}
</script>

<style>

</style>