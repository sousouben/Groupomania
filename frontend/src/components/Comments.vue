<template>
        <div>    
            <!-- Répondre  -->
            <div class="blocComment">
                <textarea type="text" id="content" name="content" rows="4" class="form-control" v-model="content" 
                placeholder="Insérer votre pseudo puis votre commentaire svp..."></textarea>
                <a v-on:click="createComment()"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>

        <!-- Liste des réponses  -->
                <div> 
                    <div v-for="comment in comments" :key="comment.id" class="blocComments" >                        
                        <p> {{ comment.content }} </p>           
                    </div>
                </div>
        </div>
</template>


<script >

export default {
    name: "Comments",
    data() {
        return {
            comment: "",
            comments: [],
        }   
    },  
    props: {

        },  
    mounted() {
        ///////////////////GET COMMENTS/////////////////////
        let url = "http://localhost:3000/api/comments/" + "id" + "/comments";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.comments = data;
                console.log(this.comments)

            })
            .catch(error => console.log(error))
    },


    methods: {
        ///////////////////CREATE COMMENTS///////////////////// 
        createComment() {
            let inputContent = {
                "content": this.content                
            }
            let url = "http://localhost:3000/api/comments/"+ "id" +"/comment";
            let options = {
                method: "POST",
                body: JSON.stringify(inputContent),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
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
.blocComment {
  width: 100%;
  margin: 2%;
  border-radius: 30px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.blocComment a {
  width: 20%;
}
.blocComments {
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  border-radius: 9px; 
  border: 6px solid  #d44c5c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.blocComments i {
  color: #0c2444;
}
.blocComments p {
  font-style: italic;
}
.blocComment i {
  color: white;
  font-size: 1.75em;
  padding-right: 25px;
  text-shadow: -3px 0 3px #d44c5c, 0 3px 3px  #d44c5c, 3px 0 3px  #d44c5c, 0 -3px 15px  #d44c5c;
}
.blocComment textarea:focus {
  border-color: white;
  box-shadow: 0px 0px 20px grey;
}
</style>