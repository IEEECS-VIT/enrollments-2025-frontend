import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

export const fetchExpiryTime = (): Promise<Date> => {
  return new Promise((resolve) => {
    const dbRequest = indexedDB.open("secureDB", 1);

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("cookies", "readonly");
      const store = transaction.objectStore("cookies");
      const getRequest = store.get("ExpiryTime");

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
