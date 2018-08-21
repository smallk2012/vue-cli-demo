<template>
  <div class="page home">
    <div class="sidebar">
      <div class="title">
        ECHART
      </div>
      <div class="tree">
        <ul>
          <li v-for="(item,mIndex) in trees" :key="mIndex" :data-pid="mIndex" :data-sid="-1" @dragstart.stop="handleDragStart($event)" @drop.stop="handleDrop($event)" @dragover.prevent="handleDragOver($event)" @dragenter.stop="handleDragEnter($event)" @dragleave.stop="handleDragLeave($event)">
            <p class="main-title" :data-pid="mIndex" :data-sid="-1">{{item.name}}</p>
            <ol>
              <li v-for="(sub,sIndex) in item.subs" :key="sIndex" :data-pid="mIndex" :data-sid="sIndex" draggable="true" @dragstart.stop="handleDragStart($event)" @drop.stop="handleDrop($event)" @dragover.prevent="handleDragOver($event)" @dragenter.stop="handleDragEnter($event)" @dragleave.stop="handleDragLeave($event)">
                <p class="sub-title" :data-pid="mIndex" :data-sid="sIndex">{{sub.name}}</p>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-cont">
      <o-chart :option="option" v-for="(option,index) in chartOptions" :key="index"></o-chart>
    </div>
  </div>
</template>

<script>
import chart from "../../components/chart";
import PieHalfRose from "../../../static/chart/PieHalfRose";
import CircularCircular from "../../../static/chart/CircularCircular";
import PieDoughnut from "../../../static/chart/PieDoughnut";
import PieLegend from "../../../static/chart/PieLegend";
import BarRichText from "../../../static/chart/BarRichText";
import BarYCategoryStack from "../../../static/chart/BarYCategoryStack";
import MultipleYAxis from "../../../static/chart/MultipleYAxis";
import Radar from "../../../static/chart/Radar";
import MultipleXAxis from "../../../static/chart/MultipleXAxis";
import BubbleGradient from "../../../static/chart/BubbleGradient";
import Funnel from "../../../static/chart/Funnel";
import Gauge from "../../../static/chart/Gauge";
import Weather from "../../../static/chart/Weather";

export default {
  name: "Home",
  components: {
    "o-chart": chart
  },
  data() {
    return {
      chartOptions: [
        PieHalfRose,
        CircularCircular,
        PieDoughnut,
        PieLegend,
        BarRichText,
        BarYCategoryStack,
        MultipleYAxis,
        Radar,
        MultipleXAxis,
        BubbleGradient,
        Funnel,
        Gauge,
        Weather
      ],
      dragEl: null,
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
    handleDragStart: function(e) {
      this.dragEl = e.target;
    },
    handleDrop: function(e) {
      e.target.style.borderBottom = "none";
      if (
        e.target.dataset.pid != this.dragEl.dataset.pid ||
        e.target.dataset.sid != this.dragEl.dataset.sid
      ) {
        var _fEl = this.trees[this.dragEl.dataset.pid].subs.splice(
          this.dragEl.dataset.sid,
          1
        )[0];
        if (e.target.dataset.sid == -1) {
          console.log("d");
          this.trees[e.target.dataset.pid].subs.unshift(_fEl);
        } else {
          this.trees[e.target.dataset.pid].subs.splice(
            e.target.dataset.sid + 1,
            0,
            _fEl
          );
        }
      }
    },
    handleDragOver: function(e) {},
    handleDragEnter: function(e) {
      if (
        e.target.dataset.pid != this.dragEl.dataset.pid ||
        e.target.dataset.sid != this.dragEl.dataset.sid
      ) {
        e.target.style.borderBottom = "1px solid #999";
      }
    },
    handleDragLeave: function(e) {
      e.target.style.borderBottom = "none";
    }
  },
  mounted() {
    var arr = [1,2,3,4,5,6,7,8,9]
    var arr_ = [[],[],[],[]]
    function sort(o){
        var len = arr.length;
        while(o.length>0){
          var i = (len - arr.length)%arr_.length;
          var _ar = o.splice(Math.random()* o.length,1)[0];
          arr_[i].push(_ar);
        }
    }
    sort(arr)
    console.log(JSON.stringify(arr_))
    //输出 [[8,1,6],[9,2],[5,3],[7,4]]
    
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/var.scss";
.home {
  .sidebar {
    position: absolute;
    top: $headerHeight;
    bottom: 0;
    left: 0;
    width: $logoWidth;
    background-color: #343a4a;
    overflow-x: hidden;
    overflow-y: auto;
    .title {
      position: relative;
      display: block;
      padding: 20px 0 10px 15px;
      font-size: 12px;
      color: #fff;
      line-height: 1;
      &:after {
        content: "";
        position: absolute;
        left: 10px;
        right: 0;
        bottom: 0;
        display: block;
        height: 1px;
        background-color: #fff;
      }
    }
  }
  .tree {
    .main-title,
    .sub-title {
      padding-left: 10px;
      font-size: 12px;
      color: #fff;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Chrome/Safari/Opera */
      -khtml-user-select: none; /* Konqueror */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
    .sub-title {
      padding-left: 20px;
    }
  }
  .main-cont {
    display: block;
    padding-left: $logoWidth;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
