<template>
  <div class="page">
  </div>
</template>

<script> 
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.$api.post('/ajax/test.php',(res)=>{
      console.log(res)
    },{a:'xxss'})
  }
}
</script>

<style scoped lang="scss">
</style>
