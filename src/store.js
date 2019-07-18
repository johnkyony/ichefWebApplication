import Vue from 'vue'
import Vuex from 'vuex'
const firebase = require('./firebaseConfig.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentuser: null ,
    userProfile: {}

  },
  mutations: {
    setCurrentUser(state , val){
      state.currentuser = val
    },
    setUserProfile(state , val){
      state.userProfile = val
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
    }

  }
})
