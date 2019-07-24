import firebase from 'firebase'
import 'firebase/firestore'

//firebase init goes here 
const config = {
  apiKey: "AIzaSyCpWAgboJusJqS9EUCRXZc4V7T_DGtH4Q0",
  authDomain: "ichef-14324.firebaseapp.com",
  databaseURL: "https://ichef-14324.firebaseio.com",
  projectId: "ichef-14324",
  storageBucket: "ichef-14324.appspot.com",
  messagingSenderId: "629470272511",
  appId: "1:629470272511:web:68226d0573f15547"
}
firebase.initializeApp(config)

//firebase utils 
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

//date issue fix according to firebase 
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

//firebase collections 
const usersCollection = db.collection('users')
const recipesCollection = db.collection('recipes')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')


// firebase auth user state change 


export {
  db, 
  auth , 
  currentUser,
  usersCollection,
  recipesCollection,
  commentsCollection,
  likesCollection

}