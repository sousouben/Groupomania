<template>
  <nav id="navbar">
    <router-link to="/" title="Home"><i class="fas fa-home"></i></router-link>
    <router-link to="/login" title="Login"><i class="fas fa-sign-in-alt"></i></router-link>  
    <router-link to="/about" title="About"><i class="fas fa-cog"></i></router-link>
    <router-link to="/infos" title="infos"><i class="fas fa-info"></i></router-link>
    
  </nav>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
<style scoped>
#navbar {
    height: 57%;
    
}
</style>
