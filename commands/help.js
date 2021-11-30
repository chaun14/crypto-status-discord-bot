const config = require("../config");
const MessageEmbed = require("../utils/MessageEmbed");

module.exports.run = async (client, message, args) => {
  let embed = new MessageEmbed();

  let helpContent = "";

  for (let [name, cmd] of client.commands) {
    helpContent = helpContent + "`" + config.prefix + name + "`" + "\n";
  }

  embed.setAuthor("Live crypto status discord bot");
  embed.addField("Commands", helpContent);
  embed.addField("Misc :", `CryptoLive status currently set on \`${config.liveCrypto.name}\`\n\n *made with <3 by chaun14#1403*`);
  embed.setColor("#9534eb");
  embed.setFooter(message.member.username + "#" + message.member.discriminator, message.author.dynamicAvatarURL("webp"));

  embed.setTimestamp();

  message.channel.createMessage({ embed: embed.code });
};

module.exports.config = {
  name: __filename.slice(__dirname.length + 1, __filename.length - 3),
  aliases: ["h"],
};
