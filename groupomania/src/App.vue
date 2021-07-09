<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>|
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Patrick Hand', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: blueviolet;

    &.router-link-exact-active {
      color: blue;
    }
  }
}
</style>
