import axios from 'axios'
import cf from './config'
import urls from './urls'
import Qs from 'qs'//必须引入这个处理post参数不然后端接收不到

function apiAxios(_method, _url, _callback, _params) {
	_params = _params || {};
	_url = _url || '';

	let _field0 = _url.substring(0, _url.lastIndexOf("/"));
	_field0 = _field0.substring(_field0.lastIndexOf("/") + 1, _field0.length);
	let _field1 = _url.substring(_url.lastIndexOf("/") + 1, _url.length);
	let _key = _field0 + _field1;
	//阻止联系点击
	if (isDouble(_key,_params)) {
		return false;
	}
	else {
		hash[_key] = _params;
	}

	axios({
		method: _method,
		url: _url + '?rd=' + Math.random(),
		data: _method === 'POST' || _method === 'PUT' ? Qs.stringify(_params) : null,
		params: _method === 'GET' || _method === 'DELETE' ? _params : null,
		baseURL: api.baseURL,
		withCredentials: false,
		headers: {
			'Content-Type': _method === 'POST' || _method === 'PUT' ? 'application/x-www-form-urlencoded' : 'application/json'
		}
	})
		.then(function (res) {
			delHash(_key,_params);
			api.log("请求方法：" + _method);
			api.log("请求链接：" + api.baseURL + _url);
			api.log("请求参数：" + JSON.stringify(_params));
			api.log(JSON.stringify(res.data));
			_callback && _callback(res.data);
		})
		.catch(function (err) {
			delHash(_key,_params);
			api.log("请求方法：" + _method);
			api.log("请求链接：" + api.baseURL + _url);
			api.log("请求参数：" + JSON.stringify(_params));
			api.log(JSON.stringify(err));
			_callback && _callback(api.errBack(err));
		})
}
/**
 * 处理多次操作
 */
let hash = {};
const isDouble = (_key,_value) => {
	let _bl = false;
	for (let o in hash) {
		if (o == _key && hash[o] && JSON.stringify(hash[o]) == JSON.stringify(_value)) {
			_bl = true;
			break;
		}
	}
	return _bl;
}
const delHash = (_key,_value) => {
	if (hash[_key] && JSON.stringify(hash[_key]) == JSON.stringify(_value)) delete hash[_key];
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
Object.assign(api, urls);

export default api