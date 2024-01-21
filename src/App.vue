<template>

    <side-navigation v-show="canSee"></side-navigation>
    <router-view/>
</template>

<script>

import sideNavigation from "@/components/sideNavigation";
export default {
    components: {
        sideNavigation
    },
    data(){
      return {
          canSee: false
      }
    },
    created() {
        this.$router.push({
            path: '/'
        })
    }

}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
