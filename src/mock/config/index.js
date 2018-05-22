import login from '../data/login.js'

const mockTime =  3000;//模拟请求多久时间返回数据
const mockData = _url =>{
    let _data = null;
    if(_url.toLowerCase().indexOf('/login') != -1)
    {
        _data = login;
    }
    return _data;
}
export default {
    mockTime,
    mockData
}