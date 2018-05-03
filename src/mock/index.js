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