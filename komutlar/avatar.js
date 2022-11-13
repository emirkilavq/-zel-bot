const Discord = require('discord.js');
const db = require('quick.db');

exports.run = function(client, message, args) {
  let us =  message.mentions.users.first() || message.guild.members.get(args[0]) || message.author

const kullanıcı = client.users.get(us.id)


const embed = new Discord.RichEmbed()
.setDescription(`
**${kullanıcı.tag}**
\`ID: ${kullanıcı.id}\`
`)

.setColor(0x00000)
.setImage(us.avatarURL || kullanıcı.avatarURL || message.author.avatarURL)
message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["av"],
  permLevel: 0
};

exports.help = {
  name: 'avatar', 
  description: "Avatar",
  usage: 'avatar'
};