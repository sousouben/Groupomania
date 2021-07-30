<template>
        <div>    
            <!-- Répondre  -->
            <div class="blocanswer">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Ecrire votre commentaire ici svp..."></textarea>
                <a v-on:click="createAnswer()"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>

        <!-- Liste des réponses  -->
                <div> 
                    <div v-for="answer in answers" :key="answer.id" class="blocanswers" >                        
                        <p class="userPseudo"> {{ answer.User.pseudo + ": " }}{{ answer.contents }} </p> <br/>
                    </div>
                </div>
        </div>
</template>


<script >
export default {
    name: "Answers",
    data() {
        return {
            answer: "",
            answers: [],
        }
    },
    //Passer des données aux composants enfants avec les props//
    props: {
        messageId: Number,
        messageUserId: Number,
    },
    mounted() {
        ///////////////////GET COMMENTS/////////////////////
        let url = `http://localhost:3000/api/comments/${this.messageId}/comments`;
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
                this.answers = data.message
                console.log(this.answers)
            })
            .catch(error => console.log(error))
    },
    methods: {
        ///////////////////CREATE COMMENT///////////////////// 
        createAnswer() {
            console.log(this.createAnswer);
            let inputContent = {
                "content": this.content,
                "postId": this.messageId               
            }
            let url = `http://localhost:3000/api/comments/${this.messageId}/comment`;
            let options = {
                method: "POST",
                body: JSON.stringify(inputContent),
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.user.token,
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.ok) {
                        this.content = {}
                    } else {
                        alert("Commentaire envoyé 🖅");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>

<style lang="css">
h4 {
  text-transform: uppercase;
}
.blocanswer {
  width: 100%;
  margin: 0;
  border-radius: 30px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.blocanswer a {
  width: 10%;
}
.blocanswers {
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  border-radius: 30px; 
  border: 6px solid  #d44c5c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.blocanswers i {
  color: #0c2444;
}
.blocanswers p {
  font-style: italic;
}
.blocanswer i {
  color: white;
  font-size: 1.75em;
  padding-right: 25px;
  text-shadow: -3px 0 3px #d44c5c, 0 3px 3px  #d44c5c, 3px 0 3px  #d44c5c, 0 -3px 15px  #d44c5c;
}
.blocanswer textarea:focus {
  border-color: white;
  box-shadow: 0px 0px 20px grey;
}

.userPseudo{
    font-size: 1rem;
}
</style>