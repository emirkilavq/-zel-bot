const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const db = require('quick.db')

exports.run = async (bot, message, args) => {

  const seksizaman = moment
    .duration(bot.uptime)
    .format(" D [Gün], H [Saat], m [Dakika], s [Saniye]");
  const istatistikler = new Discord.RichEmbed()
    .setColor("0x000000")
    .setTitle(`${bot.user.username} İstatistik`)
    .setThumbnail(bot.user.avatarURL)
    .setFooter("© 2021 Tüm Hakları Saklıdır!", bot.user.avatarURL)

    .setDescription(
      `**Toplam Kullanıcı:** __` +
        bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +
        `\n__**Toplam Sunucu:** __` +
        bot.guilds.size.toLocaleString() +
        `\n__**Toplam Kanal:** __` +
        bot.channels.size.toLocaleString() +
        `__\n \n` +
        `**Bellek Kullanımı: **__` +
        (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
        ` MB__\n` +
        `**Çalışma Süresi: **__${seksizaman}__\n \n` +
        `**Discord.JS Sürüm:** __v` +
        Discord.version +
        `__`
    )

  return message.channel.send(istatistikler)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "statistics",'istatistik'],
  permLevel: 0,
  katagori: ""
};

exports.help = {
  name: "static",
  description: "Bot Statics!",
  usage: "static"
};