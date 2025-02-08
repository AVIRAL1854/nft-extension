const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 3000;
const alchemyApiKey = process.env.alchemyApi;
// const coinGeckoApi=process.env.coinGeckoApi;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});


app.get("/getCollectionList",async(req,res)=>{

    try{

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/nfts/list",
          
        );
        // const response = await axios.get(
        //   `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}/getNFTsForCollection`
        // );
        if(response.status==200){
            console.log("this is successfull");

            return res.json({
                message:"this is working fine",
                data:response.data
            })
        }

        if(response.status!=200){
            throw new Error("this is custom error :"+JSON.stringify(response));
        }

    }catch(error){

        console.log("this is the error in getCollectionList:"+error.message);
        return res.json({
            message:"this is not working fine",
            error:error.message
        })
    }


})






app.get("/getCollectionData", async (req, res) => {
  try {
    const id = req.headers["id"];

    if (!id) {
      return res.status(400).json({
        error: "Collection ID is required",
      });
    }

    const link = `https://api.coingecko.com/api/v3/nfts/${id}`;
    const response = await axios.get(link);

    return res.json({
      message: "Data retrieved successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching collection data:", error.message);
    return res.status(500).json({
      error: "Failed to fetch collection data",
    });
  }
});


app.post("/nftByContract",async(req,res)=>{

  try{
    if(alchemyApiKey==undefined){
      res.json({
        message:"Alchemy API is missing from env variable"
      })
    }

    const body=await req.body;
    const contractAddress=body.contractAddress;
    const link = `https://eth-mainnet.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true`;

     const options = {
      method: 'GET',
      url: link,
      headers: { accept: 'application/json' },
    };


    
    const response =await axios.get(link);
    console.log(body.contractAddress +" ====" );

    
    // console.log(JSON.stringify(response.data));
    
    return res.json({
      message:"this is working fine",
      response:response.data
    })

  }catch(error){
   return  res.json({
      message:"not working fine",
      error:error.message
    })
  }

})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
