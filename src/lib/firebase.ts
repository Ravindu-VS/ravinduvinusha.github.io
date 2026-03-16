import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgHsvPpYDdK6nPy3ePO_SUeHWgWpu9cqM",
  authDomain: "portfolio-bb45c.firebaseapp.com",
  projectId: "portfolio-bb45c",
  storageBucket: "portfolio-bb45c.firebasestorage.app",
  messagingSenderId: "730240274993",
  appId: "1:730240274993:web:2652fd7ae6ae1b4b97fb10",
  measurementId: "G-GPKSBCSMRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics lazily (only when needed, fails silently if blocked)
export const initAnalytics = async () => {
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch (e) {
    // Analytics blocked by ad blocker or not supported - fail silently
    console.debug('Analytics not available:', e);
  }
  return null;
};

export default app;
