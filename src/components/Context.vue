<template>
  <vue-context ref="menu" :close-on-click="true" :close-on-scroll="true">
    <li>
      <a @click="deleteNote">Delete</a>
    </li>
    <li>
      <a @click="changeBackground('red')">색상 변경: 빨강</a>
    </li>
    <li>
      <a @click="changeBackground('green')">색상 변경: 녹색</a>
    </li>
    <li>
      <a @click="changeBackground('black')">색상 변경: 검정</a>
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
    },
    changeBackground(color) {
      this.$emit('changeBackground', color)
    }
  }
    
    };


</script>