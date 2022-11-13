const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
  
  
exports.run = async (client, msg, args) => {
if (!msg.member.hasPermission ("ADMINISTRATOR")) return msg.reply(`Bu Komutu Kullanmak İçin **Yönetici** İznine Sahip Olmalısın!`);
let usdurum = db.get(`usohbet_${msg.channel.id}`)
if(!usdurum || usdurum === 'pasif') usdurum = "Pasif"
if(!args[0]) return msg.channel.send('Ultra Sohbet Temizleme Modu Şu Anda ' + usdurum + '\nBu Özelliği Açmak Veya Kapatmak için ``aç`` veya ``kapat`` yazmalısın')

  if(args[0] === 'aç') {
    db.set(`usohbet_${msg.channel.id}`,'aktif')
    msg.channel.send('**Özellik Bu Kanalda Açıldı**')
    }
  else if (args[0] === 'kapat') {
    db.set(`usohbet_${msg.channel.id}`,'pasif')
    msg.channel.send('**Özellik Bu Kanalda Kapatıldı**')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ultrasohbettemizleyici', 'ultrasohbet'],
  permLevel: 0,
}

exports.help = {
  name: 'us',
  description: '',
  usage: ''
}