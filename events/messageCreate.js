const config = require("../config");
const colors = require("colors");

module.exports = async (client, message) => {
  // we diasllow commands from bot & commands in dm
  if (!message.guildID || message.author.bot) {
    return;
  }

  // give the guild object inside the command cuz that's kinda usefull
  message.guild = client.guilds.get(message.guildID);

  const mainPrefix = config.prefix;
  const prefixes = [mainPrefix, `<@!${client.user.id}>`, `<@${client.user.id}>`];

  let prefix = false;
  for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  if (!prefix) return;

  // parse msg content
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // get command
  let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  // permissions stuff
  message.author.isManager = false;
  for (let roleid of config.permissions.manage) {
    if (message.member.roles.includes(roleid)) message.author.isManager = true;
  }

  message.author.isScholar = false;
  for (let roleid of config.permissions.scholar) {
    if (message.member.roles.includes(roleid)) message.author.isScholar = true;
  }

  console.log("[" + "COMMAND".magenta + "] " + cmd.config.name.cyan + " in " + message.guildID.green + " by " + message.author.username.yellow);

  return cmd.run(client, message, args).catch((warning) => console.log(warning));
};
