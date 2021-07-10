import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

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
        state.user.token = localStorage.getItem('token'),
        state.user.status = status
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:3000/api/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => {
          console.log('réponse API',response);
          context.commit('saveUserInfos',[response.data.pseudo, response.data.id, response.data.email, response.data.status])
        })
        .catch(error => {
          console.log('Erreur auth', error); 
        });
    },
    changeEditStyle(context, value){
      context.commit('editStyle',value)
    }

  },
  modules: {
  }
})
