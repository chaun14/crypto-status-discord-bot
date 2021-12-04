//1. Import coingecko-api
const CoinGecko = require("coingecko-api");
const config = require("../config");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

let cryptoDataCache;

module.exports.initLiveCrypto = async (client) => {
  setClientStatus(client);

  setInterval(() => {
    setClientStatus(client);
  }, 1000 * 60 * config.liveCrypto.refreshInterval);
};

async function setClientStatus(client) {
  const data = await fetchCryptoData();

  if (data.percentage >= config.liveCrypto.highThreshold) {
    // stonks

    client.editStatus("online", { name: data.string, type: 0 });
  } else if (data.percentage > config.liveCrypto.lowThreshold && data.percentage < config.liveCrypto.highThreshold) {
    // that's fine

    client.editStatus("idle", { name: data.string, type: 0 });
  } else {
    //no stonks

    client.editStatus("dnd", { name: data.string, type: 0 });
  }
  console.log("[LIVECRYPTO] Refresh status ✅ ");
}

async function fetchCryptoData() {
  const result = await CoinGeckoClient.coins.fetch(config.liveCrypto.name);

  // cache result to avoid ratelimits
  if (result) {
    cryptoDataCache = result.data;
  }

  const price_change_percentage_24h = result.data.market_data.price_change_percentage_24h;
  const current_price = result.data.market_data.current_price[config.liveCrypto.currency];
  const name = result.data.name;

  return { string: `${config.liveCrypto.currencySymbol}${current_price.toFixed(2)} @ ${price_change_percentage_24h.toFixed(2)}% | ${name}`, percentage: price_change_percentage_24h.toFixed(2), result: result.data };
}

module.exports.getCoinCache = async (name) => {
  if (name == config.liveCrypto.name) {
    if (cryptoDataCache) {
      return cryptoDataCache;
    } else {
      return await fetchCryptoData().result;
    }
  } else {
    let result = await CoinGeckoClient.coins.fetch(name);

    return result.data;
  }
};

module.exports.getCoinCharts = async (name) => {
  let result = await CoinGeckoClient.coins.fetchMarketChart(name, { vs_currency: config.liveCrypto.currency });
  if (result) {
    return result.data;
  } else {
    return undefined;
  }
};
