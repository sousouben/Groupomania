<template>
  <v-container class="home-container">
    <v-row class="text-center bandeau">
      <v-col class="mb-4 px-5">   
        <h1 class="display-1 font-weight-bold mb-5">          
          Bienvenue sur le Social Network de Groupomania !          
        </h1>
        <img src="../assets/Groupe.png" alt="groupe">
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: "Home"
};
</script>
<style lang="scss" scoped>
h1{
  color:blueviolet;
}
li{
  list-style: none;  
  
  }
*{
  font-size: 1.5rem;
  color: blue;
}


</style>
