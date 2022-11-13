const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
let ghost = args[0]
let ghostt = args[1]
if (!ghost || !ghostt) return message.channel.send(`Lütfen 2 kelime yazınız!`)
let Ghost_attachment = `https://api.alexflipnote.dev/pornhub?text=${ghost}&text2=${ghostt}`
message.channel.send(new Discord.Attachment(Ghost_attachment,"img.png"));
}
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['hub-yazı'],
  permLevel: 0
};
exports.help = {
  name: 'pornhub-yazı',
  description: '',
  usage: ''
};