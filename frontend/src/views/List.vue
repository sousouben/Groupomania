<template>
     <section>
        <NavbarIntern></NavbarIntern>
        
          <div class="blocsignup">
			<h1>Bienvenue dans le forum</h1> 
            <p>Social Network Groupomania</p>                
          </div> 

        <ListMessages/> 
     </section> 
</template>


<script>
import NavbarIntern from '../components/NavbarIntern';
import ListMessages from '../components/ListMessages';
export default {
    name: 'List',
    components: {
        NavbarIntern, 
        ListMessages
       },
}
</script>
  
<style lang="css">
.blocsignup h1 {
   margin-top: 0;
   padding: 10px;
}
</style>