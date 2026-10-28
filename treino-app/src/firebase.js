import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(config).every(Boolean)
const app = isFirebaseConfigured ? initializeApp(config) : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
const functions = app ? getFunctions(app, 'southamerica-east1') : null
export const watchAuth = (callback) => (auth ? onAuthStateChanged(auth, callback) : () => {})

export async function signIn(email, password, createAccount = false) {
  if (!auth) throw new Error('Configure o Firebase no arquivo .env.local para entrar.')
  return createAccount
    ? createUserWithEmailAndPassword(auth, email, password)
    : signInWithEmailAndPassword(auth, email, password)
}

export async function signInWithGoogle() {
  if (!auth) throw new Error('Configure o Firebase no arquivo .env.local para entrar.')
  return signInWithPopup(auth, new GoogleAuthProvider())
}

export async function signOutUser() {
  if (auth) await signOut(auth)
}

export async function loadUserData(userId) {
  if (!db) return null
  const snapshot = await getDoc(doc(db, 'users', userId))
  return snapshot.exists() ? snapshot.data() : null
}

export async function saveUserData(userId, data) {
  if (!db) return
  await setDoc(doc(db, 'users', userId), data, { merge: true })
}

export async function requestWorkoutGeneration(payload) {
  if (!functions || !auth?.currentUser) {
    throw new Error('Entre com sua conta para gerar um treino com IA.')
  }
  const generateWorkout = httpsCallable(functions, 'generateWorkout')
  const result = await generateWorkout(payload)
  return result.data
}
