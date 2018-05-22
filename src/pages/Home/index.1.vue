<template>
  <div class="page">
    <ul class="tree">
      <li :data-m="mIndex" v-for="(item,mIndex) in trees" :key="mIndex" @dragstart.stop="handleDragStart(mIndex,item.name)" @dragenter.stop="handleDragEnter($event)" @dragleave.stop="handleDragLeave($event)" @dragover.prevent="handleDragOver(item.name)" @drop.stop="handleDrop1(mIndex,$event)" @dragend.stop="handleDragEnd(item.name)">
        <p class="main-title">{{item.name}}</p>
        <ol>
          <li :data-s="sIndex" v-for="(sub,sIndex) in item.subs" :key="sIndex" draggable="true" @dragstart.stop="handleDragStart(mIndex,sIndex)" @dragenter.stop="handleDragEnter($event)" @dragleave.stop="handleDragLeave($event)" @dragover.prevent="handleDragOver(sub.name)" @drop.stop="handleDrop(sIndex,$event)" @dragend.stop="handleDragEnd(sub.name)">
            <p class="sub-title">{{sub.name}}</p>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dragIndex:-1,
      trees: [
        {
          name: "菜单1",
          subs: [
            {
              name: "子菜单1"
            }
          ]
        },
        {
          name: "菜单2",
          subs: [
            {
              name: "子菜单2"
            }
          ]
        },
        {
          name: "菜单3",
          subs: [
            {
              name: "子菜单3"
            },
            {
              name: "子菜单31"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleDrop1: function(i,e) {
      e.target.style.borderBottom = 'none';

      this.trees[i].subs.unshift();
    },
    handleDrop: function(i,e) {
      e.target.style.borderBottom = 'none';
    },
    handleDragEnd: function(e) {
      //console.log("结束")
      //console.log(e)
    },
    handleDragStart: function(m,s) {
      this.dragIndex = i;
      //console.log("开始")
      //console.log(e)
    },
    handleDragEnter: function(e) {
      console.log("接收")
      e.target.style.borderBottom = '1px solid #999';
    },
    handleDragLeave: function(e) {
      console.log("离开")
      console.log(e)
      e.target.style.borderBottom = 'none';
    },
    handleDragOver: function(e) {
      //console.log("进入" + e)
    }
  },
  mounted() {
    this.$api.get("", res => {
      console.log(res);
    });
    this.$api.get("/login2", res => {
      console.log(res);
    });
    this.$api.get("/login", res => {
      console.log(res);
    });
  }
};
</script>

<style scoped lang="scss">
.tree {
  width: 200px;
  background-color: #e0e0e0;
  li {
    .main-title {
      padding-left: 20px;
      line-height: 40px;
      background: url("../../assets/tree/cf.png") no-repeat top left;
    }
    .sub-title {
      margin-left: 20px;
      padding-left: 20px;
      line-height: 40px;
      background: url("../../assets/tree/bsopen.png") no-repeat top left;
    }
  }
}
</style>
