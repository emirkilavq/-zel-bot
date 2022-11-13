const Discord = require('discord.js');
const ms = require('parse-ms');

exports.run = async(client, message, args) => {
  let yilbasi = new Date('2021-05-12 00:00:00')
    let zaman = ms(yilbasi - Date.now())

    message.channel.send(`TosunPaşa'nın doğum gününe **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
    kategori: 'eğlence',
  permLevel: 0
};

exports.help = {
  name: 'tosunpaşa',

  description: 'TosunPaşa nin doğum gününe kaç gün kaç saat kaç dakika kaç saniye olduğunu gösterir.',
  usage: ''
};