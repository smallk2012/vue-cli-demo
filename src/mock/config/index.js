import login from '../data/login.js'
import api from '../../api'

const mockTime = 3000;//模拟请求多久时间返回数据
const mockData = _url => {
    let _data = null;
    switch (_url) {
        case api.login:
            _data = login;
            break;
    }
    return _data;
}
export default {
    mockTime,
    mockData
}