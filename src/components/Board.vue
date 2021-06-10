<template>
  <div>
    <v-row>
     <v-col cols="3" class="mt-3">
       <h3>새 노트를 추가해보세요.</h3>
       <Note/>
     </v-col> 
     <v-row>
      <v-col cols="9" class="mt-3">
       <h3>노트 목록</h3>
       <AddedNote v-for="note in notes" :key="note"/>
     </v-col>
     </v-row>
     
    </v-row>
    
  </div>
</template>

<script>
import Note from './Note'
import AddedNote from './AddedNote'
export default {
  name: 'Board',
  components: {
    Note,
    AddedNote
  },
  data: () => {
    return {
      notes: [1,2,3],
    }
  },

}
</script>

<style>

</style>