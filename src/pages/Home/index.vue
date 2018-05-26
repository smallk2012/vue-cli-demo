<template>
  <div class="page">
    <div class="demo">{{msg}}</div>
    <input type="text" v-model="keyword" placeholder="测试vuex双向绑定" />
    <div>{{keyWord}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Home",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    computed: {
        ...mapGetters("app",{
            keyWord: "keyWord",
            loading: "islogined"
        }),
        keyword: {
            get() {
                return this.keyWord;
            },
            set(value) {
                this.$store.dispatch("app/setKeyWord", value);
            }
        }
    },
    mounted() {
        this.$api.get(
            this.$api.url.login,
            res => {
                console.log(res);
            },
            { a: "xxss" }
        );
        this.$api.get(
            this.$api.url.login,
            res => {
                console.log(res);
            },
            { a: "xxss" }
        );
        this.$api.get(
            this.$api.url.login,
            res => {
                console.log(res);
            },
            { a: "xxss" }
        );
    }
};
</script>

<style scoped lang="scss">
@import "../../assets/_var.scss";
.demo {
    width: px2rem(100px);
    height: px2rem(50px);
    font-size: px2rem(24px);
}
</style>
