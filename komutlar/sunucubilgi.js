const Discord = require("discord.js");
const moment = require("moment");
const useful = require("useful-tools")
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
  const tarih = useful.tarih(message.guild.createdTimestamp)
    const sunucubilgi = new Discord.RichEmbed()
      .setColor("DARK")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("Sunucu Sahibi", message.guild.owner)
    .addField("Sunucu Adı", message.guild.name)
      .addField("Sunucu ID", message.guild.id)
      .addField("Rol Sayısı", message.guild.roles.size)
      .addField(
        "Kanal Sayısı",
        message.guild.channels.size
      )
      .addField("Emoji Sayısı", message.guild.emojis.size)
      .addField("Sunucu Bölgesi", message.guild.region)
      .addField("Üye Sayısı", message.guild.memberCount)
      .addField("AFK Kanalı", message.guild.afkChannel || `Ayarlanmamış`)
      .addField('AFK Zaman Aşımı', message.guild.afkTimeout)
      .addField('Sistem Mesaj Kanalı ', message.guild.systemChannel)
      .addField("Oluşturulma Tarihi", `${tarih}`)
      .setThumbnail(message.guild.iconURL);
    return message.channel.sendEmbed(sunucubilgi);
    message.react("😂");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu", "sunucu-bilgi", "sbilgi","server","server-bilgi","sbilgi","serverinfo","server-info"],
  permLevel: 0
};

exports.help = {
  name: "sunucu-bilgi",
  description: "Sunucu hakkında bilgi verir.",
  usage: "sunucubilgi"
};