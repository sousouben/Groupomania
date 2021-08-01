<template>
<div>
    <h1>Bonjour, vous vous êtes sûrement perdus !  
    <router-link to="/" title="retour"><i @click="retour" class="fas fa-home"></i></router-link></h1>
    <img src="../assets/404.png" alt="redirection erreur"/>
</div>
</template>
<script>

export default {
    name: 'NotFound',
    methods:{
    retour(){      
      this.$router.push("/")  
    }
  }
}
</script>
<style lang="css" scoped>
h1{
    color: #0c2444;
    }
i{
    font-size: 1rem;
    color:#d44c5c ;
    padding: 0 5px 0 5px;   
}    

</style>
