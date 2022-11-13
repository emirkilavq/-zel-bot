const Discord = require('discord.js');
const ms = require('parse-ms');

exports.run = async(client, message, args) => {
  let yilbasi = new Date('2022-01-01 00:00:00')
    let zaman = ms(yilbasi - Date.now())

    message.channel.send(`Yılbaşının kutlanmasına **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
    kategori: 'eğlence',
  permLevel: 0
};

exports.help = {
  name: 'yılbaşı',

  description: 'Yılbaşının kutlanmasına kaç gün kaç saat kaç dakika kaç saniye olduğunu gösterir.',
  usage: ''
};