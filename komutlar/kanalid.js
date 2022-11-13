const Discord = require("discord.js")

exports.run = async (client, message, args) => {
let kanal = message.mentions.channels.first() //channel'da olabilir emin değilim
if (!kanal) return message.channel.send("kanal etiketle knk")
message.channel.send(kanal.id)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanal-id',
  description: 'kanalidallan',
  usage: 'kanal-id <kanal>'
};