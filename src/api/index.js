import axios from 'axios'
import cf from './config'
import Qs from 'qs'//必须引入这个处理post参数不然后端接收不到

function apiAxios(_method, _url, _callback, _params) {
	_params = _params || {};
	_params.rd = Math.random();
	_url = _url || '';
	axios({
		method: _method,
		url: _url,
		data: _method === 'POST' || _method === 'PUT' ? Qs.stringify(_params) : null,
		params: _method === 'GET' || _method === 'DELETE' ? _params : null,
		baseURL: api.baseURL,
		withCredentials: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
		.then(function (res) {
			api.log("请求方法：" + _method);
			api.log("请求链接：" + api.baseURL + _url);
			api.log("请求参数：" + JSON.stringify(_params));
			api.log(JSON.stringify(res.data));
			_callback && _callback(res.data);
		})
		.catch(function (err) {
			api.log("请求方法：" + _method);
			api.log("请求链接：" + api.baseURL + _url);
			api.log("请求参数：" + JSON.stringify(_params));
			api.log(JSON.stringify(err));
			_callback && _callback(api.errBack(err));
		})
}

let api = {
	get: function (_url, _callback, _params) {
		return apiAxios('GET', _url, _callback, _params)
	},
	post: function (_url, _callback, _params) {
		return apiAxios('POST', _url, _callback, _params)
	},
	promiseGet: function (_url, _params) {
		return new Promise((resolve, reject) => {
			apiAxios('GET', _url, res => {
				resolve(res);
			}, _params)
		})
	},
	promisePost: function (url, params) {
		return new Promise((resolve, reject) => {
			apiAxios('POST', _url, res => {
				resolve(res);
			}, _params)
		})
	}
}
Object.assign(api, cf);
export default api