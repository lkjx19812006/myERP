const state = {
  plus: {}
}
const getters = {
  plus: state => state.plus,
}
const actions = {
  setMyPlus({commit, state}, param) {
    return new Promise((resolve, reject) => {
      commit('setMyPlus', param)
      resolve(param)
    })
  },
}
const mutations = {
  setMyPlus(state, res){
    state.plus = res
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
