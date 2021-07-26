<template>
     <section>
        <NavbarIntern></NavbarIntern>
        
          <div class="blocsignup">
			<h1>Bienvenue dans le forum</h1> 
            <p>Social Network Groupomania</p>                
          </div> 

        <ListPosts/> 
     </section> 
</template>


<script>
import NavbarIntern from '../components/NavbarIntern';
import ListPosts from '../components/ListPosts';
export default {
    name: 'List',
    components: {
        NavbarIntern, 
        ListPosts
       },
}
</script>
  
<style lang="css">
.blocsignup h1 {
   margin-top: 0;
   padding: 10px;
}
</style>