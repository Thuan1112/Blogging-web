let firebaseConfig = {
  apiKey: "AIzaSyCdrBMECSllTzGCwiTFbIbW88OpDY9Z8ko",
  authDomain: "blogging-website-2a70a.firebaseapp.com",
  projectId: "blogging-website-2a70a",
  storageBucket: "blogging-website-2a70a.appspot.com",
  messagingSenderId: "55154250956",
  appId: "1:55154250956:web:65f8d952b8e13f5ca79e69",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();
const logoutUser = () => {
  auth.signOut();
  location.reload();
};
