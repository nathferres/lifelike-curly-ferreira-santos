// src/firebase.js
import { initializeApp } from "firebase/app";  // Importando a função para inicializar o app
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";  // Funções específicas do Firestore

// Configuração do Firebase (substitua com suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyCQn6Pt93kTS0f4t12EnCexOKUOe6Ng2hk",
  authDomain: "lifelike-curly.firebaseapp.com",
  projectId: "lifelike-curly",
  storageBucket: "lifelike-curly.firebasestorage.app",
  messagingSenderId: "134315702198",
  appId: "1:134315702198:web:1a10522cac532869cf3317"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Obtendo a instância do Firestore

export { db, collection, getDocs, doc, getDoc, addDoc };  // Exportando as funções necessárias

