/**
 * 这些大写变量可以写到一个js里去
 */
const ISLOGINED = 'islogined'
/**
 * 自定义变量
 */
const state = {
	islogined:false,//登录了以后会为true
	loginInfo:{
		name:"cC",
		qiye_huiyuan:false,
		qiye_rizhu:true
	}
}
/**
 * 只读
 */
const getters = {
	islogined:state => state.islogined,
	loginInfo: state => state.loginInfo
}
/**
 * 异步操作
 */
const actions = {
}
/**
 * 同步操作
 */
const mutations = {
	[ISLOGINED](state, payload) {
		state.islogined = payload;
	},
}

export default {
	state,
	actions,
	getters,
	mutations
}