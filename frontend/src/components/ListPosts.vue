<template>
<div>

     <!-- Liste des messages -->   
      <div v-for="message in messages" :key="message.id" class="bloclist">
          <div class="blocauthor">
              <h3><i class="far fa-user-circle"></i>Pseudo: {{ message.user}}</h3>              
          </div>
          <div class="blocmessage">
              <h4><i class="fas fa-angle-double-right"></i>Titre: {{ message.title }} </h4>
              <h5 class="pmessage"><i class="fas fa-angle-right"></i>Message: "{{ message.content }}"</h5>
          </div>  
          <div class="blocactions">
                <button v-if="message.userId == userId"  
                type="button" @click="deleteMessage(message.id)" class="accountbutton">Supprimez </button>
          </div>
       
        <Answers :messageId="message.id" :messageUserId="message.userId" />
      </div>   
  </div>

</template>

<script>
import Answers from "@/components/Answers.vue";
export default {
    name: "ListPosts",
    components: {
        Answers
    },
    data() {
        return {
            user:"",
            userId: "",           
            messages: []
        }
    },
    mounted() {
        this.userId = this.$store.state.user.userId;        
        console.log(localStorage);
        let url = "http://localhost:3000/api/Posts/";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.user.token,
                
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.messages = data;
                console.log(this.messages)
            })
            .catch(error => console.log(error))
    },
    methods: {
        ///////////////////DELETE POSTS/////////////////////
        deleteMessage() {
            let url = `http://localhost:3000/api/${this.$store.state.user.userId}/delete`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.user.token,
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du message confirmé ! 😢");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        },
    },
}
</script>

<style lang="css">
.bloclist {
  width: 70%;
  margin: auto;
  margin-top: 25px;
  background-image: url("../assets/backmess.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px; 
  padding: 25px;
}
h4 {
  text-transform: uppercase;
  font-size: 1.5rem;
  text-decoration: underline;
   
}
.blocjob {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 50%;
  justify-content: space-around;
  
}
.blocauthor i {
  color: #0c2444;
  font-size: 1.75em;
  
}
.blocactions {
  width: 90%;
  margin: 0 auto;
  flex-direction: row;
}
.blocactions button {
  margin-bottom: 10px;
}
.blocauthor {
  width: 90%;
  background-color: grey;
  margin: 0 auto;
  border-radius: 30px; 
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  color: white;
}
.blocauthor h3 {
  font-size: 1.5em;
  margin: auto;
  padding-left: 15px;
  width: 50%;
}
.blocmessage {
  width: 90%;
  margin: 0 auto;
  border-radius: 30px; 
  border: 6px solid grey;
  box-sizing: content-box;
  text-align: center;
}
.blocmessage  h5 {
  font-style: italic;
}
h5 i, h4 i {
  font-size: 1rem;
  color: #0c2444;
}
@media screen and (max-width: 450px) {
	.bloclist {
    width: 90%; 
    box-shadow: inset 0px 0px 0px 8px white;
    border: 5px solid #d44c5c;
    font-size: 0.7em;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    
  }
  label, input, textarea {
    width: 75%;
    text-align: center;
  }
}
</style>