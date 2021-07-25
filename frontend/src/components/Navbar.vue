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
<style lang="css">
#navbar {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    margin: auto;
    box-shadow: inset 0px 0px 0px 10px white;
    border: 8px solid #d44c5c;
    border-radius: 30px;
    padding: 15px;
    background-color:#0c2444;
    opacity: 0.95;    
    margin-left: 25px;
}
#navbar i {
    font-size: 1rem;
    color: white;
    padding: 0 5px 0 5px;
    margin-left: 5px;
}
@media screen and (max-width: 768px) {
	#navbar {
        height: auto;
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        margin: auto;
        margin-top: 1%;
        left: 0;
    }
}
@media screen and (max-width: 450px) {
	#navbar {
        box-shadow: inset 0px 0px 0px 8px white;
        border: 5px solid #d44c5c;
    }
    #navbar i {
        font-size: 2em;
    }
}


</style>