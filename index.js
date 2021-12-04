const Eris = require("eris");
const colors = require("colors");
const fs = require("fs");
const recursive = require("recursive-readdir");

const config = require("./config.js");
const { initLiveCrypto } = require("./modules/cryptoManager.js");
require("./utils/awaitMessages");

const init = async () => {
  const client = new Eris(config.token, {
    intents: ["allPrivileged"],
    allowedMentions: [],
  });

  console.log("\n\nLoading...\n\n".brightRed);

  client.commands = new Map();
  client.slashCommands = new Map();
  client.aliases = new Map();
  let fileNumber = 0;

  // load events
  fs.readdir("./events/", (err, files) => {
    console.log(`\nEvents : (` + `${files.length}`.bold.yellow + ")");

    if (err) return console.error(err);

    files.forEach((eventFile) => {
      // load only js files
      if (!eventFile.endsWith(".js")) return;

      // retrive path
      const event = require(`./events/${eventFile}`);

      // get name from path
      let eventName = eventFile.split(".")[0];

      // bind it
      client.on(eventName, event.bind(null, client));
      console.log(`Loading event : `.white + `${eventName}`.blue);

      fileNumber = fileNumber + 1;
    });
  });

  // load commands
  recursive("./commands/", (err, files) => {
    if (err) return console.error(err);

    console.log(`\n\nCommands : (` + `${files.length}`.bold.yellow + ")");

    files.forEach((file) => {
      if (!file.endsWith(".js")) return;

      let props = require(`./${file}`);

      let filePath = file.replace(/\\/g, "/"); // weird thing to avoid path issues
      let commandName = filePath.split(/\//g).reverse()[0];
      commandName = commandName.split(".")[0];

      // register command
      client.commands.set(commandName.toLowerCase(), props);

      // register alias
      props.config.aliases.forEach((alias) => {
        client.aliases.set(alias.toLowerCase(), props.config.name.toLowerCase());
      });

      // format aliases list
      let aliases = props.config.aliases.map((e) => e.toString()).join(", ");

      console.log(`Loaded command : ` + `${commandName}`.brightRed);
      console.log(`Aliases : ` + `${aliases}`.cyan);
      fileNumber = fileNumber + 1;
    });
    console.log(`\nLoaded ` + `${fileNumber}`.yellow + ` files.`);
  });

  // load slash
  recursive("./slashCommands/", (err, files) => {
    if (err) return console.error(err);

    console.log(`\n\nSlashCommands : (` + `${files.length}`.bold.yellow + ")");

    files.forEach((file) => {
      if (!file.endsWith(".js")) return;

      let props = require(`./${file}`);

      let filePath = file.replace(/\\/g, "/"); // weird thing to avoid path issues
      let commandName = filePath.split(/\//g).reverse()[0];
      commandName = commandName.split(".")[0];

      // register command
      client.slashCommands.set(props.data.name.toLowerCase(), props);

      console.log(`Loaded slash command : ` + `${props.data.name}`.brightRed);
      fileNumber = fileNumber + 1;
    });
    console.log(`\nLoaded ` + `${fileNumber}`.yellow + ` files.`);
  });

  client.once("ready", () => initLiveCrypto(client));

  client.connect();
};

init();
