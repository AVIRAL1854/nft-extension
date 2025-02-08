import { useState, useRef, useEffect } from "react";
import axios from "axios";
import CollectionChecker from "./CollectionChecker";

const SearchBar = ({ text }) => {
  const [nftDetail, setNftDetail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [closeDetails, setCloseDetails] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const searchRef = useRef(null);

  const searchHandler = async () => {
    if (nftDetail.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/getCollectionList"
      );
      const data = response.data.data;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data received from server");
      }

      const filteredResults = data.filter(
        (collection) =>
          (collection.name?.toLowerCase().includes(nftDetail.toLowerCase()) ||
            collection.contract_address
              ?.toLowerCase()
              .includes(nftDetail.toLowerCase()) ||
            collection.asset_platform_id
              ?.toLowerCase()
              .includes(nftDetail.toLowerCase())) &&
          collection.asset_platform_id === "ethereum"
      );

      setSearchResults(filteredResults);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching collections:", error);
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full h-20 items-center flex justify-center relative"
      ref={searchRef}
    >
      <input
        type="text"
        className="border-2 border-gray-600 bg-gray-800 rounded-lg text-center h-8 w-2/3"
        placeholder="Search NFT here"
        value={nftDetail}
        onChange={(e) => setNftDetail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchHandler();
          }
        }}
      />
      <input
        type="button"
        value="Search"
        className="font-bold text-white bg-gray-600 rounded text-white px-2 h-8 mx-2 hover:text-black hover:bg-gray-200 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
        onClick={searchHandler}
      />

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-16 w-2/3 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
          {searchResults.map((collection) => (
            <div
              key={collection.contract_address || collection.id}
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setSelectedCollection(collection);
                setCloseDetails(true);
                setShowResults(false);
              }}
            >
              <div className="text-white font-bold">{collection.name}</div>
              <div className="text-gray-400 text-sm">
                {collection.contract_address || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && searchResults.length === 0 && (
        <div className="absolute top-16 w-2/3 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 p-2 text-white">
          No results found.
        </div>
      )}

      {/* Details Modal */}
      {closeDetails && selectedCollection && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center bg-black/50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setCloseDetails(false);
              }}
            >
              ✕
            </button>
            <CollectionChecker
              id={selectedCollection.id}
              contractAddress={selectedCollection.contract_address}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
