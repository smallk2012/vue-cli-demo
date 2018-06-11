<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app{
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
