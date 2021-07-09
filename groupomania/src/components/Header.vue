<template>
    <div class="header">
        <router-link to='/'>
        <h1>
            <img src="../assets/icon-left-font.png" alt="logo groupomania">
        </h1>
        </router-link>
        <nav>
            <router-link to='/myprofile'>
            <div>Mon copmte</div>
            </router-link>
            <div id="disconnect-btn" @click= disconnect()>Se déconnecter</div>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'Header',
    methods:{
        disconnect(){
            localStorage.removeItem('user');
            location.href = '/';
        }
    }
}
</script>