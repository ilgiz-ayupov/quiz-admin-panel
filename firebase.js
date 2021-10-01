const admin = require("firebase-admin")

admin.initializeApp({
    apiKey: "AIzaSyAFefD9qWpYKcq3JSDI3cx-KF0IGmxQGi4",
    authDomain: "quiz-db-326518.firebaseapp.com",
    projectId: "quiz-db-326518",
    storageBucket: "quiz-db-326518.appspot.com",
    messagingSenderId: "988345778879",
    appId: "1:988345778879:web:6c8966f91d1dffaccb7c0a"
  })
  
  const bucket = admin.storage().bucket()
  
  module.exports = {
    bucket
  }