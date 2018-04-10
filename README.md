### Webpack+Vue搭建
- **第一步：**先安装nodejs，[传送门，已安装跳过](https://nodejs.org/en/ "点击安装地址，已安装跳过")
- **第二步：**新建一个项目目录，在目录里空白处，按住Shift键不放，点击鼠标右键，打开命令框，输入`npm install -g vue-cli` [已安跳过]
- **第三步：**命令框输入`vue init webpack`，出现的提示，默认按回车即可，当出现Use ESLint to lint your code开始，都可以选择N。
- **第四步：**命令框输入`npm install`
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
//需要在方法里去掉http://yingzaiqidian.cn
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
//mock目录index.js和data目录，data目录下建index.js存放返回的数据，
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import data from './data';

export default {
/**
 * mock bootstrap
 */
	bootstrap() {
		let mock = new MockAdapter(axios);
		//所有拦截请求都走该接口
		mock.onAny().reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					let method = config.method.toUpperCase();
					let params = {};
	
					if(method === 'POST' || method === 'PUT') {
						params = config.data;
					} else {
						params = config.params;
					}
					//这里是本人接口结构,由方法作为字段，查询在data目录下对应数据
					//这里可以通过config.url调用接口地址来判断返回对应值
					if(params.method && data[params.method]) {
						resolve([200, data[params.method]]);
					}
					else{
						//调不到本地数据将返回500异常
						resolve([200, config.url || config.baseURL]);
					}			
				}, 1000);
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

export default new Router({
	//mode: 'history',
	routes: [{
			path: '/home',
			name: 'home',
			component: resolve => require(['@/pages/Home.vue'], resolve)
		},
		{
			path: '*',
			redirect: {
				path: '/home'
			}
		}
	]
})
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
entry: {
   app: ["babel-polyfill", "./src/main.js"]//'./src/main.js'//解决IE es6兼容问题
}
```