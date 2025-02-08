import React, { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon, ExternalLink } from "lucide-react";
import axios from "axios";
import NFTByContract from "./NFTByContract";

const CollectionChecker = ({ id ,contractAddress }) => {
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlerGetDetails = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/getCollectionData`,
          { headers: { id: id } }
        );

        const { data } = response;
        if (!data || !data.data) {
          throw new Error("Invalid data received from server");
        }

        setCollectionData(data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching collection data:", error);
        setError(error.message);
        setCollectionData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      handlerGetDetails(id);
    }
  }, [id]);

//   if (loading) return <div className="text-center p-4">Loading...</div>;

if (loading) {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center bg-black/50">
      {" "}
      {/* Added classes */}
      <div className="loader"></div> {/* Your loader component */}
    </div>
  );
}
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!collectionData) return null;

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num);

  return (
    <div
      className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg space-y-6 overflow-y-auto"
      style={{ height: "calc(100vh - 48px)" }}
    >
      {/* Banner and Logo */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={collectionData.banner_image}
          alt="Collection Banner"
          className="w-full h-60 object-cover"
        />
        <div className="absolute -bottom-12 left-8">
          <img
            src={collectionData.image.small_2x}
            alt="Collection Logo"
            className="w-32 h-32 rounded-lg border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Collection Info */}
      <div className="mt-14 bg-gray-800 p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{collectionData.name}</h1>
            <p className="text-gray-400">{collectionData.symbol}</p>
          </div>
          <div className="flex gap-4">
            {collectionData.links.twitter && (
              <a
                href={collectionData.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <ExternalLink size={24} />
              </a>
            )}
            {collectionData.links.discord && (
              <a
                href={collectionData.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-500"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            title="Floor Price"
            value={`${formatNumber(
              collectionData.floor_price.native_currency
            )} ETH`}
            percentage={
              collectionData.floor_price_24h_percentage_change.native_currency
            }
          />
          <InfoCard
            title="Market Cap (USD)"
            value={`$${formatNumber(collectionData.market_cap.usd)}`}
            percentage={collectionData.market_cap_24h_percentage_change.usd}
          />
          <InfoCard
            title="Total Supply"
            value={formatNumber(collectionData.total_supply)}
          />
          <InfoCard
            title="Unique Owners"
            value={formatNumber(collectionData.number_of_unique_addresses)}
          />
          <InfoCard
            title="24h Volume (ETH)"
            value={`${formatNumber(
              collectionData.volume_24h.native_currency
            )} ETH`}
            percentage={
              collectionData.volume_24h_percentage_change.native_currency
            }
          />
          <InfoCard
            title="24h Sales"
            value={formatNumber(collectionData.one_day_sales)}
            percentage={collectionData.one_day_sales_24h_percentage_change}
          />
          <InfoCard
            title="7d Floor Price Change"
            value={`${formatNumber(
              collectionData.floor_price_7d_percentage_change.native_currency
            )}%`}
            percentage={
              collectionData.floor_price_7d_percentage_change.native_currency
            }
          />
          <InfoCard
            title="14d Floor Price Change"
            value={`${formatNumber(
              collectionData.floor_price_14d_percentage_change.native_currency
            )}%`}
            percentage={
              collectionData.floor_price_14d_percentage_change.native_currency
            }
          />
          <InfoCard
            title="30d Floor Price Change"
            value={`${formatNumber(
              collectionData.floor_price_30d_percentage_change.native_currency
            )}%`}
            percentage={
              collectionData.floor_price_30d_percentage_change.native_currency
            }
          />
          <InfoCard
            title="60d Floor Price Change"
            value={`${formatNumber(
              collectionData.floor_price_60d_percentage_change.native_currency
            )}%`}
            percentage={
              collectionData.floor_price_60d_percentage_change.native_currency
            }
          />
          <InfoCard
            title="1y Floor Price Change"
            value={`${formatNumber(
              collectionData.floor_price_1y_percentage_change.native_currency
            )}%`}
            percentage={
              collectionData.floor_price_1y_percentage_change.native_currency
            }
          />
          <InfoCard
            title="All-Time High (ETH)"
            value={`${formatNumber(collectionData.ath.native_currency)} ETH`}
          />
          <InfoCard
            title="ATH Change (%)"
            value={`${formatNumber(
              collectionData.ath_change_percentage.native_currency
            )}%`}
            percentage={collectionData.ath_change_percentage.native_currency}
          />
          <InfoCard
            title="ATH Date"
            value={new Date(
              collectionData.ath_date.native_currency
            ).toLocaleDateString()}
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <div
            className="text-gray-300 prose prose-invert"
            dangerouslySetInnerHTML={{ __html: collectionData.description }}
          />
        </div>

        {/* Additional Links */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Links</h2>
          <div className="flex gap-4">
            {collectionData.links.homepage && (
              <a
                href={collectionData.links.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                Website
              </a>
            )}
            {collectionData.explorers.map((explorer, index) => (
              <a
                key={index}
                href={explorer.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                {explorer.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <NFTByContract contractAddress={contractAddress} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, percentage }) => (
  <div className="p-4 bg-gray-700 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {percentage !== undefined && (
      <div className="flex items-center mt-2">
        {percentage >= 0 ? (
          <ArrowUpIcon className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`ml-1 ${
            percentage >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {Math.abs(percentage).toFixed(2)}%
        </span>
      </div>
    )}
  </div>
);

export default CollectionChecker;
