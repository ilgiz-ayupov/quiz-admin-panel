import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

Vue.config.productionTip = false
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAFefD9qWpYKcq3JSDI3cx-KF0IGmxQGi4",
  authDomain: "quiz-db-326518.firebaseapp.com",
  projectId: "quiz-db-326518",
  storageBucket: "quiz-db-326518.appspot.com",
  messagingSenderId: "988345778879",
  appId: "1:988345778879:web:6c8966f91d1dffaccb7c0a"
})

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
export {db, storage}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
