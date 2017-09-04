//存储跟采购订单相关的管理
import httpService from '../../common/httpService'

const state = {
  httpParam: {
    page: 1,
    pageSize: 15,

  }
}
// getters
const getters = {
  // httpParam: state => state.httpParam,

}

// actions
const actions = {
  login({commit, state}, param) {
    return new Promise((resolve, reject) => {
      httpService.commonPost(param.path, param.body)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }
}

// mutations
const mutations = {
  setUserInfo(state, res){
    state.user = res.biz_result;
    console.log(state.user);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

