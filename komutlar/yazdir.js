const Discord = require('discord.js');
//Dcs Ekibi
exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
    message.delete();
   message.channel.send(mesaj);
}; //Dcs Ekibi

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say', 'söyle'],
  permLevel: 0
};

exports.help = {
  name: 'y'
  //Dcs Ekibi
};