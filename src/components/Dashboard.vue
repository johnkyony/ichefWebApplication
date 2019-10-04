<template>
    <div id="dashboard">
        <transition name="fade">
        <div v-if="perfomingRequest" class="loading">
          <p>Loading ...</p>
        </div>
      </transition>
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{ userProfile.name }}</h5>
                    <p>Chef</p>
                    <div class="create-post">
                        <p>Create a new recipe</p>
                        <form @submit.prevent>
                            <textarea v-model.trim="post.content"></textarea>
                            <button @click="createRecipe" :disabled="post.content == ''" class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <div>
                    <p class="no-results">There are currently no Recipes</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data(){
            return {
                post: {
                    content: ''
                }
            }
        }, 
        computed: {
            ...mapState(['userProfile' , 'currentUser'])
        }, 
        methods: {
           createRecipe(){
              this.$store.dispatch('createRecipe' , {createdOn: new Date() , content: this.post.content , userId: this.currentUser.id , userName: this.userProfile.name , comments: 0 , likes: 0})
              .then(()=> {
                  this.post.content = ''
              })
              .catch(err => {
                  console.log(err)
              })

            }
        }
        
    }
</script>