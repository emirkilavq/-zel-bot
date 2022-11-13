const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
//Dcs Ekibi
exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#36393F")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`sunucu-pp` Adlı Komutu Özel Mesajlarda Kullanamazsın!')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.guild.name)
  .setColor("#36393F")
    .setTimestamp()
    .setDescription('')
        .setImage(`${message.guild.iconURL} `)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-pp','serverpp','sunucupp','server-pp'],
  permLevel: 0
}; //Dcs Ekibi

exports.help = {
  name: 'sunucupp',
  description: 'Sunucu Resminin Linkini Atar.',
  usage: 'sunucuresmi'
};