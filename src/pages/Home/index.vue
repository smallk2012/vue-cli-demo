<template>
  <div class="page">
    <div class="demo">{{msg}}</div>
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
  @import  '../../assets/_var.scss';
  .demo{
    width: px2rem(100px);
    height: px2rem(50px);
    font-size: px2rem(24px);
  }
</style>
