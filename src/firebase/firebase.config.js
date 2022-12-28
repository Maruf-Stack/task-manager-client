// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjBcrQjn54zgO3EOV1grr5PhifLuDqTew",
    authDomain: "task-manager-3503d.firebaseapp.com",
    projectId: "task-manager-3503d",
    storageBucket: "task-manager-3503d.appspot.com",
    messagingSenderId: "670207924436",
    appId: "1:670207924436:web:c81c3be859753d44ea0341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;