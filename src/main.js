import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { initializeApp } from "firebase/app"
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getFirestore } from "firebase/firestore"

Vue.config.productionTip = false
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAFefD9qWpYKcq3JSDI3cx-KF0IGmxQGi4",
  authDomain: "quiz-db-326518.firebaseapp.com",
  projectId: "quiz-db-326518",
  storageBucket: "quiz-db-326518.appspot.com",
  messagingSenderId: "988345778879",
  appId: "1:988345778879:web:6c8966f91d1dffaccb7c0a"
})

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6LfjyJMcAAAAAAs5T_HmbFk8YsCEOjHwxJij8Icj"),
  isTokenAutoRefreshEnabled: true
})


const db = getFirestore(firebaseApp)
export { db }

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
