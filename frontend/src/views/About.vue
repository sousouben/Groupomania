<template>
<div>
  <Navbar></Navbar>  
  <div class="blocsignup"> 
  
        <h1>Les 7 règles de vie chez Groupomania</h1>
        <ul>
          <li>1. Fais la paix avec ton passé pour qu’il ne dérange pas ton présent.</li>
          <li>2. Ce que les autres pensent de toi n’est pas ton problème.</li>
          <li>3. Le temps soigne presque tout. Sois patient.</li>
          <li>4. Personne n’est en charge de ton bonheur, sauf toi.</li>
          <li>5. Ne compare pas ta vie à celle des autres et ne les juge pas. Tu ne connais pas leurs épreuves.</li>
          <li>6. Arrête de trop penser. Les réponses arriveront quand tu t’y attendras le moins.</li>
          <li>7. Souris :) Tu ne portes pas tous les problèmes du monde.</li>
        </ul>       
  
</div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
  components: { Navbar },
  name:"About"
};
</script>

<style lang="css" scoped>
li{
  
  list-style: none;  
  color:white;
  padding-right: 3%;  
  
  }
  
</style>
