### Webpack+Vue搭建
- **第一步：**先安装nodejs，[传送门，已安装跳过](https://nodejs.org/en/ "点击安装地址，已安装跳过")
- **第二步：**新建一个项目目录，在目录里空白处，按住Shift键不放，点击鼠标右键，打开命令框，输入`npm install -g vue-cli` [已安跳过]
- **第三步：**命令框输入`vue init webpack`，出现的提示，默认按回车即可，当出现Use ESLint to lint your code开始，都可以选择N。
- **第四步：**命令框输入`npm install`[有node_modules目录了跳过]
- **第五步：**我们的`<style scoped lang="scss">`默认使用sass写样式，所以命令框输入 `npm install sass-loader -D`，安装完成了继续输入`npm install node-sass -D`
- **第六步：**可以开工了。如果需要第三方css ui框架，可以自由选择。列一下我们常用的：
####bootstrap
命令框输入：
`npm install bootstrap@3`

main.js

```
import 'bootstrap/dist/css/bootstrap.min.css
import 'bootstrap/dist/js/bootstrap.min.js'
```
由于 Bootstrap 依赖于 jQuery，所以在代码中` import jQuery from ‘jquery’` 是不够的，这只是解决了自己代码对 jQuery 的依赖，在此处使用了webpack.ProvidePlugin
解决方案： `npm install jquery -D`
在 webpack.base.conf.js 头部添加

`var webpack = require('webpack')`

在 entry 后边添加
```csharp
plugins: [
  new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery"
  })
]
```
####element
命令框输入：
`npm i element-ui -S`

main.js

```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
####mint
命令框输入：

`npm install mint-ui -S`

main.js

```csharp
// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
// 按需引入部分组件
import { Cell, Checklist } from 'minu-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```
####vux
命令框输入：`npm install vux --save`

main.js

```csharp
//太大了按需加载比较好
import { Group, Cell } from 'vux'
Vue.component('group', Group)
Vue.component('cell', Cell)
```
- **第七步：**页面需要做成动态获取数据，那么我们继续命令框输入`npm install axios -D`，有时候接口需要跨域，那么我们就得配一下跨域，config目录index.js
```csharp

//比如你的请求方法是http://yingzaiqidian.cn/login
//api的config的baseURL为http://yingzaiqidian.cn
//那么做跨域模拟，需要baseURL为""
//最终看到的请求方法应该是http://localhost/api/login
proxyTable: {
	'/api': {
		target: 'http://yingzaiqidian.cn', // 你接口的域名
		changeOrigin: true,
		pathRewrite: {                
            '^/api': ''
        }
	}
}

```
- **第八步：**接口还没开发好，我们需要一下模拟数据，那么命令框输入
`npm install axios-mock-adapter -D`

mock配置

```csharp
//mock目录index.js和config目录，config目录index.js为操作模拟数据js，data目录为目录数据源js

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import config from './config'

export default {
    bootstrap(_errBack) {
        let mock = new MockAdapter(axios);
        //所有拦截请求都走该接口
        mock.onAny().reply(axiosObj => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let _mockData = config.mockData(axiosObj.url.toLowerCase());
                    if (_mockData) {
                        resolve([200, _mockData]);
                    }
                    else {
                        resolve([200, _errBack(axiosObj.url || axiosObj.baseURL)]);
                    }
                }, config.mockTime);
            });
        });
    }
}

```
- **第九步：**需要做数据管理，那么命令框输入`npm install vuex -D`

vuex配置

```csharp
//vuex目录下建store.js
import Vue from 'vue'
import Vuex from 'vuex'

import xbs from './modules/xbs'

Vue.use(Vuex)

export default new Vuex.Store({
	  modules: {
		xbs
	  }
})
```
- **第十步：**项目优化和注意事项
1. 打包build的时候config目录里的index.js的productionSourceMap为false
2. router.js动态配置
```csharp

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
			path: '/home',
			name: 'home',
			component: resolve => require(['@/pages/Home'], resolve)
		},
		{
			path: '*',
			redirect: {
				path: '/home'
			}
		}
  ]
})
router.beforeEach((to, from, next) => {
  /*if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }*/
  next()
})
export default router

```
3.细节问题
```csharp

//发布config目录index.js需要修改build的assetsPublicPath: './',
//build目录utils.js配置

if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    publicPath: '../../', //css背景路径
    fallback: 'vue-style-loader'
  })
} else {
  return ['vue-style-loader'].concat(loaders)
}
//webpack.base.conf.js
//npm install babel-polyfill -D
entry: {
   app: ["babel-polyfill", "./src/main.js"]//'./src/main.js'//解决IE es6兼容问题
}

```
4.最终main.js结构

```csharp

import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import store from './vuex/store'

import Mock from './mock'


Vue.prototype.$api = api
Vue.config.productionTip = false

api.mock && Mock.bootstrap(api.errBack);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')

```
5.总结

######互相学习
