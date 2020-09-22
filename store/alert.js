export const state = () => ({
  message: null,
  type: null
})

export const getters = {
  message (state) {
    return state.message
  },
  type (state) {
    return state.type
  }
}

export const mutations = {
  SET_MESSAGE (state, message, type) {
    state.message = message
    state.type = type
  }
}

export const actions = {
  flash ({ commit }, message, type) {
    commit('SET_MESSAGE', message, type)
  },
  clear ({ commit }) {
    commit('SET_MESSAGE', null, null)
  }
}
