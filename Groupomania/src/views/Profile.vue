<template>
<section>
  <Navbar></Navbar>  
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>
      {{ user.pseudo }} <br />
      {{ user.email }}
    </p>
    <img src=""  />
    <button @click="deleteProfil" class="accountbutton">
      Supprimez votre compte
    </button>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Navbar from '../components/Navbar'

export default {
  name: "Profile",
  components: {
        Navbar
    },
  data() {
    return {
      userAccount: {
        userId: localStorage.getItem("userId"),
        pseudo: "",
        email: "",
        image: "",
      },
    };
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
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteProfil() {
      let url = `http://localhost:3000/api/users/delete/${this.userAccount.userId}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, options)
        .then((response) => {
          console.log(response);
          localStorage.clear();
          alert("Suppression du compte confirmée ! 😢");
        })
        .then(this.$router.push("/login"))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.accountbutton {
  width: auto;
  margin: 10px 10px 50px 10px;
}
</style>