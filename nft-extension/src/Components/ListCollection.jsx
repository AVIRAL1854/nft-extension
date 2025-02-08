import React, { useState, useEffect } from "react";
import ListingRowCollection from "./ListingRowCollection";
import axios from "axios";
import nftDatabase from "../db/indexedDB";


const ListCollections = () => {
  const [allCollections, setAllCollections] = useState([]); // Store all data fetched from server
  const [visibleCollections, setVisibleCollections] = useState([]); // Store only the currently visible collections
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = 6;
  const [closeDetails,setCloseDetails]=useState(false);

  // Fetch data only once when component mounts

 const saveCollectionsToDb = async (collections) => {
   try {
     for (const collection of collections) {
       // Validate the collection object
       if (!collection.address) {
        //  console.warn("Skipping collection with missing address:", collection);
         continue; // Skip this collection
       }

       // Format the collection data
       const collectionData = {
         contractAddress: collection.address, // Ensure this is correct
         contract: {
           name: collection.name,
           symbol: collection.symbol,
           tokenType: collection.tokenType,
           totalSupply: collection.totalSupply,
           deployedBlockNumber: collection.deployedBlockNumber,
         },
         stats: {
           floorPrice: collection.floorPrice,
           totalVolume: collection.totalVolume,
           owners: collection.owners,
         },
         metadata: {
           description: collection.description,
           imageUrl: collection.imageUrl,
           bannerImageUrl: collection.bannerImageUrl,
           externalUrl: collection.externalUrl,
           twitterUsername: collection.twitterUsername,
           discordUrl: collection.discordUrl,
         },
         timeLastUpdated: new Date().toISOString(),
       };

       // Save to IndexedDB
       await nftDatabase.addCollection(collectionData);
     }
     console.log("Collections saved to database successfully");
   } catch (error) {
     console.error("Error saving collections to database:", error);
   }
 };

  // Updated useEffect with database integration

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);

        // First, try to get data from IndexedDB
        const cachedCollections = await nftDatabase.getAllCollections();

        if (cachedCollections?.length > 0) {
          setAllCollections(cachedCollections);
          setVisibleCollections(cachedCollections.slice(0, ITEMS_PER_PAGE));
          setCurrentIndex(ITEMS_PER_PAGE);
        }

        // Fetch fresh data from API
        const response = await axios.get(
          "http://localhost:3000/getCollectionList"
        );

        if (response.data?.data) {
          const collections = response.data.data;

          // Filter collections to include only Ethereum-based ones
          const ethereumCollections = collections.filter(
            (collection) => collection.asset_platform_id === "ethereum"
          );

          // Update state with filtered Ethereum collections
          setAllCollections(ethereumCollections);
          setVisibleCollections(ethereumCollections.slice(0, ITEMS_PER_PAGE));
          setCurrentIndex(ITEMS_PER_PAGE);

          // Save only Ethereum collections to IndexedDB
          await saveCollectionsToDb(ethereumCollections);
        }
      } catch (err) {
        setError("Failed to fetch collections");
        console.error("Error:", err);

        // If API fails but we have cached data, we can still show that
        const cachedCollections = await nftDatabase.getAllCollections();
        if (cachedCollections?.length > 0) {
          setAllCollections(cachedCollections);
          setVisibleCollections(cachedCollections.slice(0, ITEMS_PER_PAGE));
          setCurrentIndex(ITEMS_PER_PAGE);
          setError("Using cached data - couldn't fetch latest updates");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    };

    fetchCollections();
  }, []);

  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         "http://localhost:3000/getCollectionList"
  //       );

  //       if (response.data?.data) {
  //         setAllCollections(response.data.data);
  //         // Set initial visible collections
  //         setVisibleCollections(response.data.data.slice(0, ITEMS_PER_PAGE));
  //         setCurrentIndex(ITEMS_PER_PAGE);
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch collections");
  //       console.error("Error:", err);
  //     } finally {

  //       setTimeout(()=>{
  //         setLoading(false);

  //       },4000)
  //     }
  //   };

  //   fetchCollections();
  // }, []); 

  // Function to load more items when the "Load More" button is clicked
  const loadMoreItems = () => {
    if (currentIndex >= allCollections.length) return;

    const nextItems = allCollections.slice(0, currentIndex + ITEMS_PER_PAGE);
    setVisibleCollections(nextItems);
    setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
  };

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

 if (loading) {
   return (
     <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center bg-black/50">
       {" "}
       {/* Added classes */}
       <div className="loader"></div> {/* Your loader component */}
     </div>
   );
 }

  return (
    <div className="container mx-auto p-4 container">
      <div className="space-y-2">
        {visibleCollections.map(
          (collection) =>
            collection.asset_platform_id == "ethereum" && (
              <ListingRowCollection
                key={collection.id}
                id={collection.id}
                contractAddress={collection.contract_address}
                name={collection.name}
                asset_platform_id={collection.asset_platform_id}
                symbol={collection.symbol.slice(0, 3)}
              />
            )
        )}
      </div>

      {/* Load More button - only shown if there are more items to load */}
      {currentIndex < allCollections.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreItems}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}

     


    </div>
  );
};

export default ListCollections;
