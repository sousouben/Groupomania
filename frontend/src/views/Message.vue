<template>
  <section>
    <NavbarIntern></NavbarIntern>

    <div class="blocsignup">
      <h2>Exprimez-vous ! Partagez !</h2>
      <form id="form-signup">
        <div class="form-group">
          <label for="title">Titre du message :</label>
          <input
            type="text"
            id="title"
            name="title"
            class="form-control"
            required
            v-model="inputMessage.title"
          />
        </div>
        <div class="form-group">
          <label for="content">Contenu :</label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows="3"
            class="form-control"
            required
            v-model="inputMessage.content"
          ></textarea>
        </div>        
      <button v-on:click="sendMessage">Envoyer</button>
    </div>
  </section>
</template>

<script>
import NavbarIntern from "../components/NavbarIntern";
export default {
  name: "Message",
  components: {
    NavbarIntern,
  },
  data() {
    return {
      inputMessage: {
        title: "",
        content: "",
        image: "",
      },
      userId: this.$store.state.user.userId,
    };
  },
  methods: {    
    sendMessage() {
      let deliverMessage = {
        title: this.inputMessage.title,
        content: this.inputMessage.content,
        id: this.userId,
      };
      let url = `http://localhost:3000/api/posts/new`;
      let options = {
        method: "POST",
        body: JSON.stringify(deliverMessage),
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
          "Content-type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.ok) {
            window.location.reload();
            this.inputMessage = {}; // Retour à 0 des inputs //
          } else {
            alert("Message bien reçu 🖅");
          }
        })
        .then(this.$router.push("/list"))
        .catch((error) => console.log(error));
    }
  },
};
</script>

<style lang="css">
body {
  background-image: url("../assets/backmess.jpg");
  background-size: cover;
}
form {
  margin-top: 25px;
}
button {
  width: auto;
  box-shadow: inset 0px 0px 0px 4px white;
  border: 6px solid #d44c5c;
  border-radius: 30px;
  padding: 6px;
  font-family: "Press Start 2P", cursive;
  margin: auto;
  margin-bottom: 20px;
  background-color: white;
  color: #0c2444;
}
button:hover {
  transform: scale(1.15);
  opacity: 0.85;
  -webkit-transition: 0.3s ease-in;
  transition: 0.3s ease-out;
}
label {
  display: block;
  width: 25%;
  text-align: right;
  font-size: 1.5rem;
  margin: auto;
  color: white;
}
input,
textarea {
  width: 50%;
  height: revert;
  box-sizing: border-box;
  outline: none;
  box-shadow: inset 0px 0px 0px 4px white;
  border: 4px solid #d44c5c;
  border-radius: 30px;
  padding: 10px;
  margin: auto;
}
input:focus,
textarea:focus {
  border-color: white;
  box-shadow: 0px 0px 20px #d44c5c;
}
.form-group {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 15px;
  margin: auto;
}
.blocsignup {
  color: white;
  margin: auto;
  width: 60%;
  opacity: 0.95;
  padding-top: 20px;
  box-shadow: inset 0px 0px 0px 6px white;
  border: 6px solid #d44c5c;
  border-radius: 30px;
  text-align: center;
  margin-top: 20px;
  background-image: url("../assets/groupback.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
}
.blocsignup p {
  color: white;
  padding: 0 15px 0 15px;
}
.blocsignup h2 {
  color: #d44c5c;
  padding: 0 15px 0 15px;
}
.navlogsign {
  height: 50px;
  width: 100%;
}
.navlogsign a {
  color: white;
  font-family: "Press Start 2P", cursive;
  font-size: 0.75em;
}
.navlogsign a:hover,
.navlogsign a:focus {
  color: #d44c5c;
}
@media screen and (max-width: 768px) {
  .blocsignup {
    width: 80%;
  }
}
@media screen and (max-width: 450px) {
  .blocsignup {
    width: 90%;
    box-shadow: inset 0px 0px 0px 8px white;
    border: 5px solid #d44c5c;
    font-size: 0.7em;
  }
  .form-group {
    display: flex;
    flex-direction: column;
  }
  label,
  input,
  textarea {
    width: 75%;
    text-align: center;
  }
}
</style>