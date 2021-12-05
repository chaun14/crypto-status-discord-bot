const Eris = require("eris");
const dayjs = require("dayjs");
const fs = require("fs");
const fetch = require("node-fetch");

const Constants = Eris.Constants;

const config = require("../config");
const { getCoinCache, getCoinCharts } = require("../modules/cryptoManager");
const MessageEmbed = require("../utils/MessageEmbed");
const { genGraph } = require("../modules/chart");
const { getAverageColor } = require("../modules/averageImageColor");

module.exports = {
  data: { name: config.liveCrypto.name, description: "Show the latest " + config.liveCrypto.name + " data and charts", options: [] },
  async execute(client, data) {
    let coinName = config.liveCrypto.name;
    if (data.data.options && data.data.options[0]) {
      for (let option of data.data.options) {
        if (option.name == "name") {
          coinName = option.value;
        }
      }
    }

    let coinData = await getCoinCache(coinName);
    let coinCharts = await getCoinCharts(coinName);

    if (!coinCharts.prices || !coinData) {
      const embed = new MessageEmbed();
      embed.setColor("#FF0000");
      embed.setDescription("❌ Error\n\nUnable to fetch coin data: Please ensure you've choosen a right cryptocurrency name. Get the list [here](https://www.coingecko.com/)");
      embed.setTimestamp();
      embed.setFooter(client.user.username, client.user.dynamicAvatarURL("webp"));

      return data.editOriginalMessage({ embed: embed.code });
    }

    // time to format data
    let labels = [];
    let values = [];

    coinCharts.prices.map((price) => {
      labels.push(dayjs(price[0]).format("MM/DD HH:mm"));
      values.push(price[1].toFixed(2));
    });

    //console.log(labels);
    //console.log(values);

    let graph = await genGraph(labels, values);
    //console.log(graph);

    if (!coinData) {
      const embed = new MessageEmbed();
      embed.setColor("#FF0000");
      embed.setDescription("❌ **__Error__**\n\nUnable to fetch coin data: Please ensure you've choosen a right cryptocurrency name. Get the list [here](https://www.coingecko.com/)");
      embed.setTimestamp();
      embed.setFooter("", client.user.dynamicAvatarURL("webp"));

      return data.editOriginalMessage({ embed: embed.code });
    }
    let image = coinData.image.large;
    let name = coinData.name;
    let url = "https://www.coingecko.com/en/coins/" + coinData.id;

    let percentageDaily = coinData.market_data.price_change_percentage_24h.toFixed(2) + "%";
    let percentageWeekly = coinData.market_data.price_change_percentage_7d.toFixed(2) + "%";
    let percentageBiWeekly = coinData.market_data.price_change_percentage_14d.toFixed(2) + "%";
    let percentageMonthly = coinData.market_data.price_change_percentage_14d.toFixed(2) + "%";
    let percentageSemiAnnualy = coinData.market_data.price_change_percentage_200d.toFixed(2) + "%";
    let percentageAnnualy = coinData.market_data.price_change_percentage_1y.toFixed(2) + "%";

    let current_price = coinData.market_data.current_price[config.liveCrypto.currency];

    let marketRank = coinData.market_cap_rank;
    let high_24h = config.liveCrypto.currencySymbol + coinData.market_data.high_24h[config.liveCrypto.currency];
    let low_24h = config.liveCrypto.currencySymbol + coinData.market_data.low_24h[config.liveCrypto.currency];
    let total_volume = config.liveCrypto.currencySymbol + coinData.market_data.total_volume[config.liveCrypto.currency];
    let market_cap = config.liveCrypto.currencySymbol + coinData.market_data.market_cap[config.liveCrypto.currency];

    let embedColor = "#FF00FF";
    try {
      const response = await fetch(image);
      const buffer = await response.buffer();
      let averageColor = await getAverageColor(buffer);
      if (averageColor) embedColor = averageColor;
    } catch (error) {
      console.error(error);
    }
    // console.log(embedColor);

    const embed = new MessageEmbed();
    embed.setColor(embedColor);
    embed.setTimestamp();
    embed.setDescription(`Market cap rank: \`#${marketRank}\`\nMarket cap: \`${market_cap}\`\n24H Volume: \`${total_volume}\`\n24H High/Low: \`${high_24h}\`/\`${low_24h}\``);
    embed.addField("Current Prices:", `${config.liveCrypto.currencySymbol}: \`${current_price}\``, true);
    embed.addField("Prices changes:", `24h: \`${percentageDaily}\`\n7d: \`${percentageWeekly}\`\n14d: \`${percentageBiWeekly}\`\n1m: \`${percentageMonthly}\`\n6m: \`${percentageSemiAnnualy}\`\n1y: \`${percentageAnnualy}\`\n`, true);

    embed.setAuthor("Latest crypto info for " + name + " token", undefined, url);
    embed.setThumbnail(image);
    embed.attachFile(graph, coinName + "cryptoChart-" + data.guildID + ".png");
    embed.setFooter(client.user.username, client.user.dynamicAvatarURL("webp"));

    let msg = await data.editOriginalMessage({ embed: embed.code, file: { file: graph, name: coinName + "cryptoChart-" + data.guildID + ".png" } });
    // console.log(msg);
  },
};
