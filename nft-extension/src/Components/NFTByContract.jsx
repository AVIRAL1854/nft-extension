import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import axios from "axios";

const NFTByContract = ({contractAddress}) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
       

        const body = {
          "contractAddress": `${contractAddress}`,
        };
        const response= await axios.post("http://localhost:3000/nftByContract" ,body)

        // console.log(JSON.stringify(response.data))
        
        if (response.status !=200) {
          throw new Error("Failed to fetch NFTs");
        }

        const data = await response.data;
        setNfts(data.response.nfts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

if (loading) {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center bg-black/50">
      {" "}
      {/* Added classes */}
      <div className="loader"></div> 
    </div>
  );
}

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        BAYC NFT Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTByContract;
