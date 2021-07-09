<template>
    <div class="UserProfile">
        <div class="info-profile">
            <h2>Bonjour,</h2>
            <span>{{this.$user.pseudo}}</span>
        </div>
        <div class="delete-profile" @click="deleteUser()">Supprimer votre profile</div>
        <h3>Vos posts :</h3>
    </div>
</template>
<script>
export default {
    name: 'UserProfile',
    methods: {
        deleteUser(){
            
        }
    }
}
</script>