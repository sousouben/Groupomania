<template>
    <div class="Profile">
        <Login v-if="!connected"/>
        <Header v-if="connected"/>
        <UserProfile v-if="connected"/>
        <UserPosts v-if="connected"/>  
    </div>
</template>
<script>

import Login from '@/views/Login.vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserPosts from '@/components/UserPosts.vue';

export default {
    name: 'Profile',
    components: {
        Login,
        Header,
        UserProfile,
        UserPosts 
    },

    data(){
        return{
            connected: true
        };
    },

    created(){
        this.listConnected()
    },

    methods: {
        listConnected(){
            if(localStorage.user !== undefined){
                this.connected = true;
                console.log('Utilisateur connecté...');                
            }
            else if(localStorage.user == undefined){
                this.connected = false;
                console.log('Utilisateur déconnecté!');
            }
        },
    }
}
</script>
