/**
 * debug = true 开启数据打印模式
 */
const debug = false
/**
 * mock = true 开启模拟数据
 */
const mock = true
/**
 * baseURL 接口默认域名入口
 */
const baseURL = "http://httpbin.org"
/**
 * 统一打印调用方法
 * @param {需要打印的参数} _param 
 */
const log = (_param) => {
	if (debug) {
		console.log(_param)
	}
}
/**
 * 请求数据报错回调方法
 * @param {错误信息} _errMsg 
 */
const errBack = (_errMsg) => {
	let _obj = {};
	_obj.code = -1000;
	_obj.msg = _errMsg;
	return _obj;
}

//请求的配置文件
export default {
	debug,
	mock,
	baseURL,
	errBack
}