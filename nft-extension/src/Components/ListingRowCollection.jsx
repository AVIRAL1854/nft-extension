import { useEffect, useState } from "react";
import CollectionChecker from "./CollectionChecker";

const ListingRowCollection = ({
  id,
  contractAddress,
  name,
  asset_platform_id,
  symbol,
}) => {
  const [closeDetails, setCloseDetails] = useState(false);

  return (
    <div
      className="bg-gray-900 my-3 flex flex-row h-28 items-center cursor-pointer p-4 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
      onClick={() => {
        setCloseDetails(true);
      }}
    >
      {/* Symbol Container */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-800 border-2 border-yellow-400">
        <span className="text-3xl font-bold text-yellow-400">{symbol}</span>
      </div>

      {/* Contract Address */}
      <div className="flex-1 text-yellow-400 font-bold px-6 truncate">
        {contractAddress}
      </div>

      {/* Name */}
      <div className="flex-1 text-center font-bold text-green-400 truncate">
        {name}
      </div>

      {/* Asset Platform ID */}
      <div className="flex-1 text-center font-bold text-white truncate">
        {asset_platform_id}
      </div>

      {closeDetails && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center bg-black/50">
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 z-10"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                setCloseDetails(false);
              }}
            >
              ✕
            </button>
            <CollectionChecker id={id} contractAddress={contractAddress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingRowCollection;
