module.exports = {
  token: "yourtokenhere", // put your cool bot token
  prefix: "!", // put your fancy prefix
  permissions: {
    // don't mind that for now
    manage: [],
  },
  liveCrypto: {
    name: "unix", // should works with all coinGecko coins
    highThreshold: 1, // when the percentage will reach that amount or more, the bot will be online (green)
    lowThreshold: -1, // when the percentage will reach that amount or less, the bot will be in dnd (red)
    // if beween these two values, will be set as dnd (orange)
    refreshInterval: 1, // how much time between status change (in minutes)
  },
};
