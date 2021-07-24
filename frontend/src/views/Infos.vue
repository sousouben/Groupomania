<template>
  <section>
    <Navbar></Navbar>
    <div class="blocsignup">
      <h1>Information Groupomania</h1>
      <p>
        Notre entreprise, spécialisée dans la grande distribution, est en pleine
        expansion. <br/> Nous avons actuellement plus de 600 collaborateurs et avons
        beaucoup recruté depuis quelques années. <br/>Nous étions uniquement 300 il y
        a 3 ans.
      </p>
    </div>
  </section>
</template>


<script>
import Navbar from "../components/Navbar";

export default {
  name: "Infos",
  components: {
    Navbar,
  },
};
</script>
  
<style scoped>
p{
    padding-left: 15%;
    padding-right: 3%;
}
</style>