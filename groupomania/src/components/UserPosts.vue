<template>
    <div class="UserPost">
        <div v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id }}">
                <div class="post">
                    {{post.title}}
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserPosts',
    data(){
        return{
            posts:[]
        }
    },
    mounted(){
        this.getUserPosts();
    },
    methods: {
        getUserPosts(){
            
        }
    }
}
</script>