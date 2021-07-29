import { createStore } from 'vuex';
import 'es6-promise/auto';
import persisted from 'vuex-persistedstate';


const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'Bearer '+ user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Create a new store instance.
const store = createStore({
  plugins: [persisted()],
  state: {
    status: '',
    user: user,
    userInfos: {
      pseudo: '',
      email: '',
      image: '',
    }, 
    userProfil: {
      pseudo: '',
      email: '',
      image: '',
      createAt: '',
      isAdmin: '',    
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = 'Bearer '+ user.token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(user.token));    
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    userProfil: function (state, userProfil) {     
      state.userProfil.pseudo = userProfil.pseudo;
      state.userProfil.email = userProfil.email;
      state.userProfil.image = userProfil.image;
      state.userProfil.isAdmin = userProfil.status;

        let isoDate = userProfil.createdAt;//date de la database
        var d = new Date(isoDate);//nouvelle instance
        state.userProfil.createdAt = d.toLocaleDateString('fr-FR');//transforme iso en string 
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {      
        instance.post('/users/login', userInfos)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        console.log(userInfos);
        instance.post('/users/signup', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}, userInfos) => { 
      console.log(userInfos);     
      instance.get('/users/myprofile/'+ userInfos)
      .then(function (response) {
        console.log(response);
        commit('userProfil', response.data);
      })
      .catch(function () {
      });
    }
  }
})

export default store;