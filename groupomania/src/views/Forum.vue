<template>
     <section>
        <Navbar></Navbar>
        
          <div class="blocsignup">
			<h1></h1>
            <p></p>
          </div> 

           
     </section> 
</template>


<script>
import Navbar from '../components/Navbar'

export default {
    name: 'Forum',
    components: {
        Navbar
       
    },
}
</script>
  
<style scoped>
.blocsignup h1 {
   margin-top: 0;
   padding: 10px;
}
</style>