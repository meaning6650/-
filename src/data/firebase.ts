/**
 * Firebase 초기화 — 설정값은 .env.local (로컬) / GitHub Actions Secrets (배포)
 * VITE_FB_USE_EMULATOR=true 이면 로컬 에뮬레이터(Auth 9099 / Firestore 8080 / Storage 9199) 사용
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage';

const env = import.meta.env;

const config = {
  apiKey: env.VITE_FB_API_KEY,
  authDomain: env.VITE_FB_AUTH_DOMAIN,
  projectId: env.VITE_FB_PROJECT_ID,
  storageBucket: env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FB_MESSAGING_SENDER_ID,
  appId: env.VITE_FB_APP_ID,
};

const useEmulator = env.VITE_FB_USE_EMULATOR === 'true';

/** 설정 누락 항목 (화면 안내용) */
export const missingConfig: string[] = useEmulator
  ? []
  : Object.entries({
      VITE_FB_API_KEY: config.apiKey,
      VITE_FB_AUTH_DOMAIN: config.authDomain,
      VITE_FB_PROJECT_ID: config.projectId,
      VITE_FB_STORAGE_BUCKET: config.storageBucket,
      VITE_FB_MESSAGING_SENDER_ID: config.messagingSenderId,
      VITE_FB_APP_ID: config.appId,
    }).filter(([, v]) => !v).map(([k]) => k);

type Services = { app: FirebaseApp; auth: Auth; db: Firestore; storage: FirebaseStorage };
let services: Services | null = null;

export function firebase(): Services {
  if (services) return services;
  if (missingConfig.length) throw new Error(`Firebase 설정 미입력 / ${missingConfig.join(', ')}`);
  const app = initializeApp(
    useEmulator
      ? { apiKey: 'demo-key', projectId: 'demo-khepi-ledger', storageBucket: 'demo-khepi-ledger.appspot.com', authDomain: 'localhost' }
      : config,
  );
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  if (useEmulator) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
  }
  services = { app, auth, db, storage };
  return services;
}

export const isEmulator = useEmulator;
