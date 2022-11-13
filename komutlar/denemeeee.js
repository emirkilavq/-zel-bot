const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  var rol = message.content.split(" ").slice(1).join(" ");
  let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.id === args[0])
if (!rol) return message.channel.send("rol etiketle knk")
message.channel.send(role.id)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rol-id',
  description: 'rold',
  usage: 'rol-id <@rol>'
};