const Eris = require("eris");
const MessageEmbed = require("../utils/MessageEmbed");

module.exports = async (client, interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    if (interaction.data && client.slashCommands.has(interaction.data.name)) {
      console.log("[SLASHCMD] " + interaction.data.name + " by " + interaction.member.user.username);

      const embed = new MessageEmbed();
      embed.setTimestamp();
      embed.setDescription("⏳ Bot is thinking... ");

      let message = await interaction.createMessage({ embed: embed.code });
      interaction.message = interaction;

      client.slashCommands.get(interaction.data.name).execute(client, interaction, message);
    }
  }
};