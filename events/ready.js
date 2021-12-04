module.exports = async (client) => {
  console.log("Bot logged in as " + client.user.username + " on " + client.guilds.size + " servers");

  const commands = await client.getCommands();
  // console.log(commands);

  //TODO DO SOMETHING BETTER

  if (!commands.length) {
    client.createGuildCommand("530686638016299038", require("../slashCommands/defaultCryptoInfo").data);
    client.createGuildCommand("530686638016299038", require("../slashCommands/cryptoInfo").data);
  }
};
