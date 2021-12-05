const Eris = require("eris");
const MessageEmbed = require("../utils/MessageEmbed");

module.exports = async (client, interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    if (interaction.data && client.slashCommands.has(interaction.data.name)) {
      console.log("[SLASHCMD] " + interaction.data.name + " by " + interaction.member.user.username);

      const embed = new MessageEmbed();
      embed.setTimestamp();
      embed.setDescription("⏳ Bot is thinking... ");
      embed.setFooter(client.user.username, client.user.dynamicAvatarURL("webp"));

      let message = await interaction.createMessage({ embed: embed.code });
      interaction.message = interaction;

      slashObject = client.slashCommands.get(interaction.data.name);

      try {
        slashObject.execute(client, interaction, message);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
