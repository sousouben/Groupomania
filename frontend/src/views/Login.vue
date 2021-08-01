<template>
<section>
<Navbar></Navbar>
<div class="blocsignup"> 
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-group">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" required="required"/>
    </div>
    <div class="form-group" v-if="mode == 'create'">
      <input v-model="pseudo" class="form-row__input" type="text" placeholder="Pseudo" required="required"/>      
    </div>
    <div class="form-group">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" required="required"/>      
    </div>
    <div>
      <p class="mdp">⚠️ Minimum 8 caractères dont 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</p>
      </div>
    <div class="form-group" v-if="mode == 'login' && status == 'error_login'">
      <span class="error">Adresse mail et/ou mot de passe invalide</span>
    </div>
    <div class="form-group" v-if="mode == 'create' && status == 'error_create'">
      <span class="error">Adresse mail déjà utilisée</span>
    </div>
    <div class="form-group">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</div>
  </section>
</template>

<script>

import { mapState } from 'vuex';
import Navbar from '../components/Navbar.vue';
export default {
  components: { Navbar },
  name:"Login",
  data: function () {
    return {
      mode: 'login',
      email: '',
      pseudo: '',
      password: '',
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/profile');
      return ;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.pseudo != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {//soit en mode login soit en mode create
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/profile');
      }, function (error) {
        console.log(error);
      })
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        pseudo: this.pseudo,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>

.mdp{
  font-size: 0.8rem;
}
 
  .error{
    color: red;
  }
  .form-row__input{
    width: 95%;
  }

  .card {
  display: flex;
  flex-direction: column;
  width: 72%;
  margin: auto;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:white;
  font-weight: 500;
}

.card__action{
  color: rgb(238, 150, 150)!important;
}
</style>
