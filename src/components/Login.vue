<template>
    <div id="login">
      <transition name="fade">
        <div v-if="perfomingRequest" class="loading">
          <p>Loading ...</p>
        </div>
      </transition>
        <section>
          <div class="col1">
            <h1>Ichef</h1>
            <p>IChef is an application that allows users to access their favourite cooking recipes on their mobile devices with a single click
              of a button. It gives users access to a list of prominent and reputable chefs around the world and their secret recipes 
              and allowsusers to access these in exchange of a transactional fee.
            </p>
          </div>
          <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }" >
            <form @submit.prevent v-if="showLoginForm">
              <h1>Welcome Back</h1>
              <label for="email1">Email</label>
              <input type="text" placeholder="you@email.com" id="email1">

              <label for="password1">Password</label>
              <input type="password" placeholder="*****" id="password1" >

              <button class="button" @click="login">Log In</button>

              <div class="extras">
                <a @click="togglePasswordReset">Forgot Password</a>
                <a @click="toggleForm"> Create an Account</a>
              </div>
            </form>

            <form @submit.prevent v-if="!showLoginForm && !showForgotPassword" >
              <h1>Get Started</h1>

              <label for="name">Name</label>
              <input v-model.trim="signupForm.name" type="text" placeholder="your name" id="name">

              <label for="email2">Email</label>
              <input type="text" v-model.trim="signupForm.email" placeholder="you@email.com" id="email2">

              <label for="password2">Password</label>
              <input type="password" v-model="signupForm.password" placeholder="min 6 character" id="password2">

              <button @click="signup" class="button">Sign Up</button>

              <div class="extras">
                <a @click="toggleForm">Back to Log In</a>
              </div>

            </form>

            <form v-if="showForgotPassword" @submit.prevent class="password-reset">
              <div v-if="!passwordResetSuccess">
                <h1>Reset Password</h1>
                <p>We will send you an email to reset your password</p>

                <label for="email3">Email</label>
                <input type="text" v-model.trim="passwordForm.email" placeholder="you@email" id="email3">
                <button @click="resetPassword" class="button">Submit</button>

                <div class="extras">
                  <a @click="togglePasswordReset">Back to Log In</a>
                </div>
              </div>
              <div v-else>
                <h1>Email Sent</h1>
                <p>check your email for a link to reset your password</p>
                <button @click="togglePasswordReset" class="button"> Back to login</button>
              </div>
            </form>
            <transition name="fade">
                <div v-if="errorMsg !== ''" class="error-msg">
                  <p>{{errorMsg}}</p>
                </div>
            </transition>
          </div>
        </section>
    </div>
</template>

<script>
const firebase = require('../firebaseConfig.js')
    export default {
      data(){
        return {
          loginForm: {
            email: '',
            password: ''
          },
          signupForm: {
            name: '',
            email: '',
            password: ''
          },
          passwordForm: {
            email: ''
          },
          showLoginForm: true,
          showForgotPassword: false,
          passwordResetSuccess: false,
          // perfomingRequest: false,
          // errorMsg: ''
        }
      }, 
    computed: {
    
      loading () {
        return this.$store.state.performingRequest
      }
    },
     methods: {
       toggleForm(){
         this.showLoginForm = !this.showLoginForm
       },
       togglePasswordReset(){
         this.showForgotPassword = !this.showForgotPassword
         this.showLoginForm = !this.showLoginForm
       },

       login(){
      this.$store.dispatch('login' , {email: this.loginForm.email , password: this.loginForm.password})
        // this.perfomingRequest = true
        //  firebase.auth.signInWithEmailAndPassword(this.loginForm.email , this.loginForm.password)
        //  .then(user =>{
        //    this.$store.commit('setCurrentUser' , user.user)
        //    this.$store.dispatch('fetchUserProfile')
        //    this.perfomingRequest = false
        //    this.$store.push('/dashboard')
        //  })
        //  .catch(err => {
        //    console.log(err)
        //    this.performingRequest = false
        //    this.errorMsg = err.message
        //  })
      }, 
      signup(){
       this.$store.dispatch('signup', {email: this.signupForm.email , password: this.signupForm.password})
      //   this.perfomingRequest = true
      //  await firebase.auth.createUserWithEmailAndPassword(this.signupForm.email , this.signupForm.password)
      //   .then(user => {
          // this.$store.commit('setCurrentUser' , user.user)

      //     //create user object
      //     console.log('//user object \n ' + user)
      //     console.log('//new user object \n' + user.user.uid)
      //     firebase.usersCollection.doc(user.user.uid)
      //     .set({
      //       name: this.signupForm.name
      //     })
      //     .then(()=> {
      //       this.$store.dispatch('fetchUserProfile')
      //       this.perfomingRequest = false
      //       this.$store.push('/dashboard')
      //     })
      //     .catch(err => {
      //       console.log(err)
      //       this.perfomingRequest = false
      //     })
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      }
     },
     resetPassword(){
       this.$store.dispatch('resetPassword', {email: this.passwordForm.email })
      .then(() => {
        this.passwordResetSuccess = true
        this.passwordForm.email = ''
      })
      //  this.perfomingRequest = true 

      //  firebase.auth.sendPasswordResetEmail(this.passwordForm.email)
      //  .then(() => {
      //    this.perfomingRequest = false
      //    this.passwordResetSuccess = true
      //    this.passwordForm.email = ''
      //  })
      //  .catch(err => {
      //    console.log(err)
      //    this.perfomingRequest = false
      //    this.errorMsg = err.message
      //  })
     }
        
    }
</script>