import Vue from 'vue'
import Vuex from 'vuex'
import { async } from 'q';
import router from './router'
const firebase = require('./firebaseConfig.js')
import fireCurrentUser from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null ,
    userProfile: {},
    perfomingRequest: false, 
    errorMsg: ''

  },
  mutations: {
    setCurrentUser(state , val){
      state.currentUser = val
    },
    setUserProfile(state , val){
      state.userProfile = val
    },
    toggleLoading(state , val){
      state.perfomingRequest = val
    },
    errorMessage(state , val){
      state.errorMsg = val
    }

  },
  actions: {
    clearData({commit}){
      commit('setCurrentUser' , null)
      commit('setUserProfile' ,{})
    },
    async fetchUserProfile({commit , state}){
      try {
        await  firebase.usersCollection.doc(state.currentuser.uid)
        .get()
        commit('setUserProfile' , res.data())
        
      } catch (err) {
        console.log(err.message)
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
        
      }
      
      // .then(res => {
      //   commit('setUserProfile' , res.data())
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
     async login({commit , dispatch }, payload){
       try {
         commit('toggleLoading' , true)
         await firebase.auth.signInWithEmailAndPassword(payload.email ,payload.password)
         let user = fireCurrentUser.auth().currentUser
         console.log(user)
         commit('setCurrentUser' , user)
         await dispatch('fetchUserProfile')
         commit('toggleLoading' , false)
         router.push('/dashboard')
       } catch (err) {
        console.log(err)
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
         
       }
      // commit('toggleLoading' , true)
       
      // .then(user => {
      //   commit('setCurrentUser' , user.user)
      //   dispatch('fetchUserProfile')
      //   commit('toggleLoading' , false)
      //   router.push('/dashboard')
      // })
      // .catch(err => {
        // console.log(err)
        // commit('toggleLoading' , false)
        // commit('errorMessage' , err.message)

      // })

    },
   async signup({commit , dispatch }, payload){
      commit('toggleLoading' , true)
      try {
        await  firebase.auth.createUserWithEmailAndPassword(payload.email , payload.password)
       let user = fireCurrentUser.User
         console.log(user)
        commit('setCurrentUser' , user)
        await dispatch('createNewUser', {userId: user.uid , name: payload.userName})

        
      } catch (err) {
        console.log(err.message)
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
        
      }
     
      
    },
  async createNewUser({commit , dispatch }, payload){
     try {
     await firebase.usersCollection.doc(payload.user.user.uid)
     .set({
      name: payload.signupForm.name
    })
    await dispatch('fetchUserProfile')
    await commit('toggleLoading', false)
    router.push('/dashboard')
     } catch (error) {
       console.log(error.message)
       commit('toggleLoading' , false)
       commit('errorMessage' , err.message)
       
     }
      
      
     
    },
    async resetPassword({commit , dispatch }, payload){
      try {
        commit('toggleLoading' , true)
        await firebase.auth.sendPasswordResetEmail(payload.email)
        commit('toggleLoading' , false )
      } catch (error) {
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
        
      }
      // commit('toggleLoading' , true)
      //  firebase.auth.sendPasswordResetEmail(payload.email)
      // .then(() => {
      //   commit('toggleLoading' , false)
      // })
      // .catch(err => {
      //   commit('toggleLoading' , false)
      //   commit('errorMessage' , err.message)
      // })
    }, 
    async logout({commit , dispatch} , payload){
      try {
        await firebase.auth.signOut()
        await dispatch('clearData')
        router.push('/login')
        
      } catch (error) {
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
        
      }
      
      
    }



  }
})
