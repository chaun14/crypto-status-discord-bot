const Eris = require("eris");

const Constants = Eris.Constants;

const config = require("../config");
const defaultCryptoInfo = require("./defaultCryptoInfo");

module.exports = {
  data: { name: "cryptoInfos", description: "Shows latest data and chart of any coins on CoinGecko" + "(1.0.0)", options: [{ name: "name", description: "Name of the coin", type: Constants.ApplicationCommandOptionTypes.STRING, required: true }] },
  async execute(client, data) {
    defaultCryptoInfo.execute(client, data);
  },
};
