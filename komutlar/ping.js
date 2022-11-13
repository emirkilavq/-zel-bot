const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let msgping1 = new Date();

  let botping = new Date() - message.createdAt;

  let msgping2 = new Date() - msgping1;

  let pingembed = new Discord.RichEmbed()
    .setColor("000001")
    .addField(" API Ping : ", Math.floor(bot.ping) + "ms")
    .addField(" Bot Ping : ", Math.floor(botping) + "ms")
    .addField("Message Ping : ", "~" + Math.round(msgping2) + "ms")
    .setFooter(`Ping Komutu`);

  return message.channel.send(pingembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong", "pingi"],
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Botun pingini gösterir.",
  usage: "ping"
};
