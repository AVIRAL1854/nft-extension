import React from "react";

const NFTCard = ({ nft }) => {
  const attributes = nft.raw?.metadata?.attributes || [];

  // Format the timestamp to a readable date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl border-2 border-gray-600">
      <div className="aspect-square w-full relative">
        <img
          src={nft.image.cachedUrl}
          alt={`NFT #${nft.tokenId}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-yellow-400">
            {nft.contract.name} #{nft.tokenId}
          </h3>
          <p className="text-sm text-gray-300">
            Collection: {nft.collection.name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-xs text-gray-400">Symbol</p>
            <p className="text-sm font-medium text-gray-200">
              {nft.contract.symbol}
            </p>
          </div> */}
          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-xs text-gray-400">Total Supply</p>
            <p className="text-sm font-medium text-gray-200">
              {nft.contract.totalSupply}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-sm text-gray-300">Token Type: {nft.tokenType}</p>
          {nft.contract.openSeaMetadata?.floorPrice && (
            <p className="text-sm text-gray-200">
              Floor Price:{" "}
              <span className="font-bold text-green-500">
                {nft.contract.openSeaMetadata.floorPrice}{" "}
              </span>
              ETH
            </p>
          )}
          <p className="text-sm text-gray-300 mt-2">
            Last Updated: {formatDate(nft.timeLastUpdated)}
          </p>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="font-medium text-blue-400">Attributes:</h4>
          <div className="grid grid-cols-2 gap-2">
            {attributes.map((attr, index) => (
              <div key={index} className="bg-gray-900 p-2 rounded-lg">
                <p className="text-xs text-gray-400">{attr.trait_type}</p>
                <p className="text-sm font-medium text-gray-200">
                  {attr.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
