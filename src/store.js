import Vue from 'vue'
import Vuex from 'vuex'
import { async } from 'q';
const firebase = require('./firebaseConfig.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentuser: null ,
    userProfile: {},
    perfomingRequest: false, 
    errorMsg: ''

  },
  mutations: {
    setCurrentUser(state , val){
      state.currentuser = val
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
    fetchUserProfile({commit , state}){
       firebase.usersCollection.doc(state.currentuser.uid)
      .get()
      .then(res => {
        commit('setUserProfile' , res.data())
      })
      .catch(err => {
        console.log(err)
      })
    },
     login({commit , dispatch }, payload){
      commit('toggleLoading' , true)
       firebase.auth.signInWithEmailAndPassword(payload.email ,payload.password)
      .then(user => {
        commit('setCurrentUser' , user.user)
        dispatch('fetchUserProfile')
        commit('toggleLoading' , false)
        this.$router.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)

      })

    },
    signup({commit , dispatch }, payload){
      commit('toggleLoading' , true)
       firebase.auth.createUserWithEmailAndPassword(payload.email , payload.password)
      .then(user => {
        commit('setCurrentUser' , user.user)
        dispatch('createNewUser' , {userId: user.user.uid , name: payload.userName})

      })
    },
   createNewUser({commit , dispatch }, payload){
       firebase.usersCollection.doc(payload.user.user.uid)
      .set({
        name: payload.signupForm.name
      })
      .then(() => {
        dispatch('fetchUserProfile')
        commit('toggleLoading' , false)
        this.$router.push('/dashboard')
      })
    },
    resetPassword({commit , dispatch }, payload){
      commit('toggleLoading' , true)
       firebase.auth.sendPasswordResetEmail(payload.email)
      .then(() => {
        commit('toggleLoading' , false)
      })
      .catch(err => {
        commit('toggleLoading' , false)
        commit('errorMessage' , err.message)
      })
    }



  }
})
