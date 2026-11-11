import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/**
 * mylink-project 웹 앱 설정값.
 * Firebase 웹 설정은 브라우저에 그대로 공개되는 값이라 코드에 둬도 되며,
 * 데이터 보호는 firestore.rules(보안 규칙)가 담당한다.
 */
const DEFAULT_CONFIG = {
  apiKey: 'AIzaSyCEgdjtjg8I9pN0kCeiy5Uuv-CSV2HrZRk',
  authDomain: 'mylink-project-c3f0c.firebaseapp.com',
  projectId: 'mylink-project-c3f0c',
  storageBucket: 'mylink-project-c3f0c.firebasestorage.app',
  messagingSenderId: '589388484595',
  appId: '1:589388484595:web:aeb270e39a907a1abc0c86',
};

/** 환경변수가 있으면 우선 사용. 단, 가려진 값(•)처럼 깨진 값이면 기본값 사용 */
const pick = (value: string | undefined, fallback: string) =>
  value && /^[\x21-\x7e]+$/.test(value) ? value : fallback;

export const firebaseConfig = {
  apiKey: pick(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, DEFAULT_CONFIG.apiKey),
  authDomain: pick(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, DEFAULT_CONFIG.authDomain),
  projectId: pick(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, DEFAULT_CONFIG.projectId),
  storageBucket: pick(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, DEFAULT_CONFIG.storageBucket),
  messagingSenderId: pick(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    DEFAULT_CONFIG.messagingSenderId
  ),
  appId: pick(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, DEFAULT_CONFIG.appId),
};

/** Firebase 설정값이 채워져 있는지 여부 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
