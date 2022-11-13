const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const a = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
  let us = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author 
var kullanıcı = client.users.get(us.id)
  var sebep = args.slice(0).join("  ");
if(!sebep) return message.channel.send(new Discord.RichEmbed()
.setTitle(`${kullanıcı.tag} - AFK Uyarı`)
.setDescription(`<a:tk3:759747152112517161> AFK moduna geçmek için bir sebep belirtmelisin!`))
  let dcs15 = new Discord.RichEmbed()
    .setTitle(`${kullanıcı.tag}`)
    .setTimestamp()
    .setFooter(client.user.username)
    .setThumbnail(message.author.avatarURL)
    .setDescription(`<a:tk3:759747152112517161> AFK moduna **${sebep}** sebebiyle girmek için onay veriyor musun?`)
    .setColor("0x000001");
  message.channel.send(dcs15).then(sunucu => {
    sunucu.react("✅").then(() => sunucu.react("❌"));

    let yesFilter = (reaction, user) =>
      reaction.emoji.name === "✅" && user.id === message.author.id;
    let noFilter = (reaction, user) =>
      reaction.emoji.name === "❌" && user.id === message.author.id;

    let yes = sunucu.createReactionCollector(yesFilter, { time: 0 });
    let no = sunucu.createReactionCollector(noFilter, { time: 0 });

    yes.on("collect", r => {
      message.member.setNickname(`[AFK] ${message.member.displayName}`)
      db.set(`afktag_${message.author.id}`, message.member.displayName)
      let dcs16 = new Discord.RichEmbed()
        .setTitle(`**${kullanıcı.tag}** İşlem Başarılı!`)
        .setDescription(`<a:tk3:759747152112517161> AFK Moduna **${sebep}** sebebiyle girdiniz!`)
        .setColor("0x000001")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.guild.name);
      message.channel.send(dcs16).then(x => {
        x.delete(50000);
      });
      
    });
    db.set(`afk_${kullanıcı.id}`, sebep);
    db.set(`afk_süre_${kullanıcı.id}`, Date.now());
    no.on("collect", r => {
    db.delete(`afk_${kullanıcı.id}`, sebep);
    db.delete(`afk_süre_${kullanıcı.id}`, Date.now());
      message.channel.send(`İptal Edildi!`)
    });
  });
    };
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "afk"
};