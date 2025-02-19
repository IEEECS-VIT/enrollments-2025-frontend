import CryptoJS from "crypto-js";
import { openDB } from "idb";
import { encryptData, decryptData } from "./crypto";

const secretKey = "your-secret-key";

export const fetchExpiryTime = (subdomain: string): Promise<Date> => {
  return new Promise((resolve) => {
    const dbRequest = indexedDB.open("secureDB", 1);

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("cookies", "readonly");
      const store = transaction.objectStore("cookies");
      const getRequest = store.get(`${subdomain}Expiry`);

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const [expiryTime, signature] = getRequest.result.value.split(".");
          const computedSignature = CryptoJS.HmacSHA256(
            expiryTime,
            secretKey
          ).toString(CryptoJS.enc.Hex);

          if (computedSignature === signature) {
            resolve(new Date(Number(expiryTime))); // ✅ Valid Expiry Time
          } else {
            console.error(
              "❌ Signature mismatch. Possible tampering detected."
            );
            resolve(new Date(Date.now() + 30 * 60 * 1000)); // Fallback expiry
          }
        } else {
          resolve(new Date(Date.now() + 30 * 60 * 1000)); // Default fallback
        }
      };
    };

    dbRequest.onerror = () => {
      console.error("❌ Failed to access IndexedDB.");
      resolve(new Date(Date.now() + 30 * 60 * 1000)); // Fallback expiry
    };
  });
};

const DB_NAME = "QuizDB";
const STORE_NAME = "QuizData";
const EXPIRY_TIME_MS = 60 * 60 * 1000; // 1 hour

// Open IndexedDB
const getDb = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// Store quiz data with timestamp
export const storeQuizData = async (subdomain: string, data: any) => {
  const db = await getDb();
  const encryptedData = encryptData({
    quiz: data,
    timestamp: Date.now(), // Store current time
  });
  await db.put(STORE_NAME, encryptedData, subdomain);

  // Schedule auto-delete after 1 hour
  setTimeout(async () => {
    await deleteQuizData(subdomain);
  }, EXPIRY_TIME_MS);
};

// Retrieve quiz data (only if not expired)
export const getQuizData = async (subdomain: string) => {
  const db = await getDb();
  const encryptedData = await db.get(STORE_NAME, subdomain);

  if (!encryptedData) return null; // No data found

  const decryptedData = decryptData(encryptedData);

  // Check if expired
  if (!decryptedData || Date.now() - decryptedData.timestamp > EXPIRY_TIME_MS) {
    await deleteQuizData(subdomain);
    return null;
  }

  return decryptedData.quiz; // Return quiz questions
};

// Delete quiz data manually
export const deleteQuizData = async (subdomain: string) => {
  const db = await getDb();
  await db.delete(STORE_NAME, subdomain);
};
