// indexedDB.js

const DB_NAME = "NFTDatabase";
const DB_VERSION = 1;

const STORES = {
  COLLECTIONS: "NFT-collections",
  COLLECTION_WATCHLIST: "CollectionWatchList",
  NFT_WATCHLIST: "NFTWatchList",
};

class NFTDatabase {
  constructor() {
    this.db = null;
    this.dbInitializing = null;
  }

  // Initialize the database
  async initDatabase() {
    if (this.db) return this.db;

    if (this.dbInitializing) {
      return this.dbInitializing;
    }

    this.dbInitializing = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        this.dbInitializing = null;
        reject(`Database error: ${event.target.error}`);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.dbInitializing = null;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORES.COLLECTIONS)) {
          const collectionsStore = db.createObjectStore(STORES.COLLECTIONS, {
            keyPath: "contractAddress",
          });
          collectionsStore.createIndex("name", "contract.name", {
            unique: false,
          });
          collectionsStore.createIndex("symbol", "contract.symbol", {
            unique: false,
          });
          collectionsStore.createIndex("tokenType", "contract.tokenType", {
            unique: false,
          });
          collectionsStore.createIndex("lastUpdated", "timeLastUpdated", {
            unique: false,
          });
        }

        if (!db.objectStoreNames.contains(STORES.COLLECTION_WATCHLIST)) {
          const collectionWatchlistStore = db.createObjectStore(
            STORES.COLLECTION_WATCHLIST,
            {
              keyPath: "id",
              autoIncrement: true,
            }
          );
          collectionWatchlistStore.createIndex(
            "contractAddress",
            "contractAddress",
            { unique: true }
          );
          collectionWatchlistStore.createIndex("dateAdded", "dateAdded", {
            unique: false,
          });
          collectionWatchlistStore.createIndex("lastChecked", "lastChecked", {
            unique: false,
          });
        }

        if (!db.objectStoreNames.contains(STORES.NFT_WATCHLIST)) {
          const nftWatchlistStore = db.createObjectStore(STORES.NFT_WATCHLIST, {
            keyPath: "id",
            autoIncrement: true,
          });
          nftWatchlistStore.createIndex("contractAddress", "contractAddress", {
            unique: false,
          });
          nftWatchlistStore.createIndex("tokenId", "tokenId", {
            unique: false,
          });
          nftWatchlistStore.createIndex(
            "composite",
            ["contractAddress", "tokenId"],
            { unique: true }
          );
          nftWatchlistStore.createIndex("dateAdded", "dateAdded", {
            unique: false,
          });
        }
      };
    });

    return this.dbInitializing;
  }

  // Ensure database is initialized before any operation
  async ensureDatabase() {
    if (!this.db) {
      await this.initDatabase();
    }
    return this.db;
  }

  // NFT Collections Methods

  async addCollection(collectionData) {
    try {
      await this.ensureDatabase();

      if (!collectionData.contractAddress) {
        throw new Error("Collection data must have a valid contractAddress.");
      }

      const store = this.db
        .transaction([STORES.COLLECTIONS], "readwrite")
        .objectStore(STORES.COLLECTIONS);

      const request = store.put({
        ...collectionData,
        lastUpdated: new Date().toISOString(),
      });

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(`Failed to add collection: ${error.message}`);
    }
  }

  //   async addCollection(collectionData) {
  //     try {
  //       await this.ensureDatabase();

  //       const store = this.db
  //         .transaction([STORES.COLLECTIONS], "readwrite")
  //         .objectStore(STORES.COLLECTIONS);

  //       const request = store.put({
  //         ...collectionData,
  //         lastUpdated: new Date().toISOString(),
  //       });

  //       return new Promise((resolve, reject) => {
  //         request.onsuccess = () => resolve(request.result);
  //         request.onerror = () => reject(request.error);
  //       });
  //     } catch (error) {
  //       throw new Error(`Failed to add collection: ${error.message}`);
  //     }
  //   }

  async getCollection(contractAddress) {
    try {
      await this.ensureDatabase();

      const store = this.db
        .transaction([STORES.COLLECTIONS], "readonly")
        .objectStore(STORES.COLLECTIONS);

      const request = store.get(contractAddress);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(`Failed to get collection: ${error.message}`);
    }
  }

  async getAllCollections() {
    try {
      await this.ensureDatabase();

      const store = this.db
        .transaction([STORES.COLLECTIONS], "readonly")
        .objectStore(STORES.COLLECTIONS);

      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(`Failed to get all collections: ${error.message}`);
    }
  }

  // Collection Watchlist Methods
  async addToCollectionWatchlist(collectionData) {
    try {
      await this.ensureDatabase();

      const store = this.db
        .transaction([STORES.COLLECTION_WATCHLIST], "readwrite")
        .objectStore(STORES.COLLECTION_WATCHLIST);

      const data = {
        ...collectionData,
        dateAdded: new Date().toISOString(),
        lastChecked: new Date().toISOString(),
      };

      const request = store.add(data);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(
        `Failed to add to collection watchlist: ${error.message}`
      );
    }
  }

  // ... Similarly update all other methods with ensureDatabase()
  // For brevity, I'm showing just the key methods, but you should add
  // the ensureDatabase() check to ALL methods that access the database

  async searchCollectionsByName(name) {
    try {
      await this.ensureDatabase();

      const store = this.db
        .transaction([STORES.COLLECTIONS], "readonly")
        .objectStore(STORES.COLLECTIONS);

      const index = store.index("name");
      const request = index.getAll(IDBKeyRange.bound(name, name + "\uffff"));

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(`Failed to search collections: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
const nftDatabase = new NFTDatabase();
export default nftDatabase;
