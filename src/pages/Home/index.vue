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
    this.$api.get('',(res)=>{
      console.log(res)
    })
    this.$api.get('/login2',(res)=>{
      console.log(res)
    })
    this.$api.get('/login',(res)=>{
      console.log(res)
    })
  }
}
</script>

<style scoped lang="scss">
</style>
