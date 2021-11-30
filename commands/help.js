const config = require("../config");
const MessageEmbed = require("../utils/MessageEmbed");

module.exports.run = async (client, message, args) => {
  let embed = new MessageEmbed();

  let helpContent = "";

  for (let [name, cmd] of client.commands) {
    helpContent = helpContent + name + "\n";
  }

  embed.setDescription(helpContent);
  embed.setColor("#9534eb");
  embed.setFooter(message.guild.name, client.user.dynamicAvatarURL("webp"));

  embed.setTimestamp();

  message.channel.createMessage({ embed: embed.code });
};

module.exports.config = {
  name: __filename.slice(__dirname.length + 1, __filename.length - 3),
  aliases: ["h"],
};
