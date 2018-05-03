import login from '../data/login.js'

const mockTime =  3000;
const mockData = _url =>{
    let _data = null;
    switch (_url) {
        case '/login':
            _data = login;
            break;
    }
    return _data;
}
export default {
    mockTime,
    mockData
}