let db;

const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoincrement: true });
};

export function useIndexedDb(databaseName, storeName, method, object) {
  return new Promise((resolve, reject) => {
    tx, store;

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error");
      };
      if (method === "put") {
        store.put(object);
      }
      if (method === "get") {
        const all = store.getAll();
        all.onsuccess = function () {
          resolve(all.result);
        };
      }
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
