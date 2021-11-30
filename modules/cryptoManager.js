//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const init = async () => {
  const result = await CoinGeckoClient.coins.fetch("unix");
  const price_change_percentage_24h = result.data.market_data.price_change_percentage_24h;
  const current_price = result.data.market_data.current_price.usd;
  const name = result.data.name;
  console.log(`$${current_price.toFixed(2)} @ ${price_change_percentage_24h.toFixed(2)}% | ${name}`);
};

init();
