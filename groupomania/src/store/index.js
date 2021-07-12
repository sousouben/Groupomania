import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      pseudo: 'Nc',
      userId: 'Nc',
      email: 'Nc',
      token: null,
      status: false
  },
  editOption: ""
},  
  getters:{

  },
  mutations: {
    saveUserInfos(state, [pseudo, userId, email, status]) {
        state.user.pseudo = pseudo,
        state.user.userId = userId,
        state.user.email = email,
        //state.user.token = localStorage.getItem('token'),
        state.user.status = status
  },
},
  actions: {
},
  modules: {
  },
})
