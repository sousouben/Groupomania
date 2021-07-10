<template>
  <article>
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Content de vous revoir</h2>
            <p>Veuillez vous connecter avec vos infos personnelles</p>
            <button class="invert" id="signIn" @click="signUp = !signUp">S'identifier</button>
          </div>
          <div class="overlay-right">
            <h2>Bonjour</h2>
            <p>Veuillez saisir vos données personnelles</p>
            <button class="invert" id="signUp" @click="signUp = !signUp">S'inscrire</button>
          </div>
        </div>
      </div>

      <form class="sign-up">
        <h2>Créer une connexion</h2>
        <div>Utilisez votre email pour l'inscription</div>
        <input id="inputPseudo" v-model="dataSignup.pseudo" type="pseudo" placeholder="Pseudo" />
        <input id="inputEmail" v-model="dataSignup.email" type="email" placeholder="Email" />
        <input id="inputPassword"         v-model="dataSignup.password" type="password" placeholder="Mot de passe" />
        <button @click.prevent="sendSignup">Inscription</button>
      </form>

      <form class="sign-in">
        <h2>Connexion</h2>
        <div>Utiliser votre compte</div>
        <input id="inputEmail" v-model="dataLogin.email" type="email" placeholder="Email" />
        <input id="inputPassword" v-model="dataLogin.password" type="password" placeholder="Mot de passe" />        
        <button @click.prevent="logIn">Connexion</button>
      </form>

    </div>
  </article>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

  export default {
      name: 'Login',
    data: () => {
      return {
        signUp: false,
        dataLogin: {
          email: null,
          password: null
        },
        dataSignup: {
        pseudo: null,
        email: null,
        password: null
      },
        msg:""        
      };
    },
    computed: {
      ...mapState(["user"])
    },
    methods: {
      logIn() {
      if (       
        this.dataLogin.pseudo !== null ||
        this.dataLogin.password !== null
      ) {
        axios
          .post("http://localhost:3000/api/user/login", this.dataLogin)
          .then(response => {
            localStorage.setItem('token',response.data.token)
            location.replace(location.origin)
          })
          .catch(error => console.log(error));
      } else {
        console.log("sa n'a pas fonctionné !");
      }
    },
    sendSignup() {
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      const pseudoRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
      if (
        (this.dataSignup.email !== null ||
        this.dataSignup.pseudo !== null ||
        this.dataSignup.password !== null) &&
        (regexPassword.test(this.dataSignup.password) && regexEmail.test(this.dataSignup.email) && pseudoRegex.test(this.dataSignup.pseudo))
      ) {
        axios
          .post("http://localhost:3000/api/user/signup", this.dataSignup)
          .then(response => {
            console.log(response);
            //Réinitialisation
            this.dataSignup.email = null;
            this.dataSignup.pseudo = null;
            this.dataSignup.password = null;
          })
          .catch(error => console.log(error));
      } else {
        alert("Un problème est survenue!");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    left: 22%;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #efefef, #ccc);
    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform .5s ease-in-out;
      z-index: 100;
    }
    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background: linear-gradient(to bottom right, blue, violet);
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }
    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 70px 40px;
      width: calc(50% - 80px);
      height: calc(100% - 140px);
      text-align: center;
      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }
    .overlay-left {
      @include overlays(-20%);
    }
    .overlay-right {
      @include overlays(0);
      right: 0;
    }
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 20px 0 30px;
  }
  
  button {
    border-radius: 20px;
    border: 1px solid blue;
    background-color: blueviolet;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;
    &:active {
      transform: scale(.9);
    }
    &:focus {
      outline: none;
    }
  }
  button.invert {
    background-color: transparent;
    border-color: #fff;
  }
  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: calc(50% - 120px);
    height: calc(100% - 180px);
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;
    div {
      font-size: 1rem;
    }
    input {
      background-color: #eee;
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      width: calc(100% - 30px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      overflow: hidden;
      &:focus {
        outline: none;
        background-color: #fff;
      }
    }
  }
  .sign-in {
    left: 0;
    z-index: 2;
  }
  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }
  .sign-up-active {
    .sign-in {
      transform: translateX(100%);
    }
    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show .5s;
    }
    .overlay-container {
      transform: translateX(-100%);
    }
    .overlay {
      transform: translateX(50%);
    }
    .overlay-left {
      transform: translateX(0);
    }
    .overlay-right {
      transform: translateX(20%);
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 10;
    }
  }
</style>