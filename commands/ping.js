module.exports.run = async (client, message, args) => {
  const msg = await message.channel.createMessage("*loading*").catch((err) => console.error(err));
  if (msg) {
    msg.edit(`Pong ! 🏓\nBot ping: \`${(msg.createdAt - message.createdAt).toFixed(0)}ms\``);
  }
};

module.exports.config = {
  name: __filename.slice(__dirname.length + 1, __filename.length - 3),
  aliases: ["pong"],
};
