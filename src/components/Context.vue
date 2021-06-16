<template>
  <vue-context ref="menu" :close-on-click="true" :close-on-scroll="true">
    <li>
      <a @click="deleteNote">Delete</a>
    </li>
    <li>
      <a>Do something else</a>
    </li>
  </vue-context>
</template>
<script>
import VueContext from "vue-context";
import "vue-context/dist/css/vue-context.css";
export default { 
    components: { 
        VueContext 
        
    }, 
    methods: {
    deleteNote() {
        this.$emit("deleteNote")
    }
    
  }
    
    };


</script>