<template>
  <div id="app">
    <div class="header">
      <div class="logo"></div>
      <div class="nav-warp">
        <div class="nav">
          <ul>
            <li>
              工作表1
            </li>
            <li>工作表2</li>
            <li>工作表3</li>
            <li>工作表4</li>
          </ul>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/var.scss";

html,
body,
#app,
.page {
  position: relative;
  width: 100%;
  height: 100%;
}
body {
  background-color: #f1f2f4;
}
.page {
  padding-top: $headerHeight;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: $headerHeight;
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    width: $logoWidth;
    height: $headerHeight;
    background-color: #2c78ff;
  }
  .nav-warp {
    width: 100%;
    padding-left: $logoWidth;
    height: $headerHeight;
    .nav {
      display: block;
      padding-right: 130px;
      width: 100%;
      height: 50px;
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
      text-align: center;
      font-size: 0;
      ul {
        display: inline-block;
        li {
          position: relative;
          display: inline-block;
          padding: 0 30px;
          font-size: 14px;
          line-height: $headerHeight;
          &:after {
            content: "";
            position: absolute;
            right: 0px;
            top: 50%;
            display: block;
            margin-top: -6px;
            width: 1px;
            height: 12px;
            background-color: #000;
          }
          &:last-child {
            &:after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
