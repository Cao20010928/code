<template>

<!--    <side-navigation v-show="canSee"></side-navigation>-->
    <router-view/>
</template>

<script>

// import sideNavigation from "@/components/sideNavigation";
export default {
    components: {
        // sideNavigation
    },
    data(){
      return {
          canSee: false
      }
    },
    mounted() {
        console.log('yes')
        this.$router.push({
            path: '/mainMenu'
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
