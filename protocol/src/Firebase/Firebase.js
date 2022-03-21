import { initializeApp } from "firebase/app";
// import "firebase/storage";

// Protocol Moon Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDdAOCmB7d2Fryekzom4cQQOlA62mLThI",
    authDomain: "protocol-moon-1d3b5.firebaseapp.com",
    projectId: "protocol-moon-1d3b5",
    storageBucket: "protocol-moon-1d3b5.appspot.com",
    messagingSenderId: "270161453411",
    appId: "1:270161453411:web:ede15693d08aaf3faff356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = firebase.storage()

// export { storage, firebase as default }

export default app