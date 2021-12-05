module.exports.deploySlashCommands = async (client) => {
  const commands = await client.getCommands();
  console.log(commands);

  // if commands are already deployed
  if (commands.length) {
    // we need to check them

    for (let slashCmd of commands) {
      // if the slash command is already deployed
      if (client.slashCommands.has(slashCmd.name)) {
        let slashCommandObject = client.slashCommands.get(slashCmd.name);

        // check if the description has been edited (i.e version)
        if (slashCommandObject.data.description !== slashCmd.description) {
          console.log("[SLASHCMD] Updating global " + slashCommandObject.data.name);

          // and deploy the command again
          await client.deleteCommand(slashCmd.id);
          await client.createCommand(slashCommandObject.data).catch((err) => console.error(err));
        }
      } // if it's an unknown slash command
      else {
        // we need to delete it
        console.log("[SLASHCMD] Deleting unknown command " + slashCmd.name);

        client.deleteCommand(slashCmd.id);
      }
    }
  } else {
    // if not yet deployed, ready for a bulk upload
    for (let [name, command] of client.slashCommands) {
      console.log("[SLASHCMD] First time deploying " + name);

      await client.createCommand(command.data).catch((err) => console.error(err));
    }
  }
};
