<template>
  <div>
    <MainPage v-if="false" />
  </div>
</template>
<script>

// import HelloWorld from './components/HelloWorld.vue'
import MainPage from "./components/MainPage.vue";
// import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    // HelloWorld,
    MainPage
  },
  // setup() {
  //   const store = useStore();

  //   return {
  //     store,
  //   }
  // }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:300px;
}
</style>
