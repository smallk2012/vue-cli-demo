import axios from 'axios'
import cf from './config'

function apiAxios(_method, _url, _callback,_params) {
	_params = _params || {};
	_url = _url || '';
	axios({
		method: _method,
		url: _url,
		data: _method === 'POST' || _method === 'PUT' ? params : null,
		params: _method === 'GET' || _method === 'DELETE' ? _method : null,
		baseURL: cf.baseURL,
		withCredentials: false
	})
		.then(function (res) {
			_callback && _callback(res.data);
		})
		.catch(function (err) {
			_callback && _callback(cf.errBack(err));
		})
}

let api = {
	get: function (_url, _callback,_params) {
		return apiAxios('GET', _url, _callback,_params)
	},
	post: function (_url, _callback,_params) {
		return apiAxios('POST', _url, _callback,_params)
	},
	promiseGet: function (_url, _params) {
		return new Promise((resolve, reject) => {
			apiAxios('GET', _url, res=>{
				resolve(res);
			},_params)
		})
	},
	promisePost: function (url, params) {
		return new Promise((resolve, reject) => {
			apiAxios('POST', _url, res=>{
				resolve(res);
			},_params)
		})
	}
}
Object.assign(api,cf);
export default api