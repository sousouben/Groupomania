<template>
<section>
  <NavbarIntern></NavbarIntern>  
  <div class="blocsignup">
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>{{ user.pseudo }}<br />{{ user.email }}</p>    
    <p>Vous êtes incrit depuis le <span>{{ user.createdAt }}</span></p>   
    <button @click="deleteProfil" class="accountbutton">
      Supprimez votre compte
    </button>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
  </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import NavbarIntern from '../components/NavbarIntern';

export default {
  name: "Profile",
  components: {
        NavbarIntern
    },
  data() {
    
  },
  mounted: function () {
    console.log("ok");
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos", this.$store.state.user.userId);
  },
  computed: {
    ...mapState({
      user: "userProfil",
    }),
  },
  methods: {
    logout: function () {//DECONNEXION
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteProfil() {
      let url = `http://localhost:3000/api/users/delete/${this.$store.state.user.userId}`;     
      let options = {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.user.token,
          'Content-type': 'application/json'
        },
      };
      fetch(url, options)
        .then((response) => {
          console.log(response);
          localStorage.clear();          
          alert("Suppression du compte confirmée ! 😢");
        })
        .then(this.$router.push("/"))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css" scoped>

.accountbutton{
  width: auto;
  margin: 10px 10px 50px 10px;
}

</style>