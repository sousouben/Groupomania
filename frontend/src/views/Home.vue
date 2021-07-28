<template>
<section>
<Navbar></Navbar>
  <v-container class="home-container">    
    <v-row class="text-center bandeau">
      <v-col class="mb-4 px-5">   
        <h1 class="display-1 font-weight-bold mb-5">          
          Bienvenue sur le Social Network de Groupomania !          
        </h1>
        <img src="../assets/groupomania.png" alt="groupe">
      </v-col>
    </v-row>
  </v-container>
  </section>
</template>
<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: { Navbar },
  name:"Home"
};


</script>
<style>


</style>
