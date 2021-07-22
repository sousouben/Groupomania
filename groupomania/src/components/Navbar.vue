<template>
  <nav id="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>  
    <router-link to="/about">About</router-link>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  methodes:{
    deconnect(){
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style lang="css">
#navbar {
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    left:3%;
    top: 9%;   
    box-shadow: inset 0px 0px 0px 10px white;
    border: 8px solid #d4616f;
    border-radius: 30px;
    padding: 15px;
    background-color:#0d69e0;
    opacity: 0.95;
    margin-top: 25px;
    margin-left: 25px;
}
#navbar i {
    font-size: 2.5em;
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
        left: 0;
    }
}
@media screen and (max-width: 450px) {
	#navbar {
        box-shadow: inset 0px 0px 0px 8px white;
        border: 5px solid #da6b78;
    }
    #navbar i {
        font-size: 2em;
    }
}
</style>