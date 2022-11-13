const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
require("moment-duration-format")
module.exports.run = async (client, message, args) => {

  let sayi = 1
  let mesaj_kişi = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`puan_${message.guild.id}_${b.user.id}`) || 0) -
        (db.get(`puan_${message.guild.id}_${a.user.id}`) || 0)
      );
    })
    .slice(0, 10)
    .map(member => {
      let date = db.get(`puan_${message.guild.id}_${member.user.id}`)
      if(date){
      return `\n\`${sayi++}.\`  <@${member.user.id}>:  \`${db.get(
        `puan_${message.guild.id}_${member.user.id}`
      )}\` Mesaj`;
        }
    });

//sesli

 let sayi2 = 1
  let ses_kişi = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`voicei_${message.guild.id}_${b.user.id}`) || 0) -
        (db.get(`voicei_${message.guild.id}_${a.user.id}`) || 0)
      );
    })
    .slice(0, 10)
    .map(member => {
     let date = db.get(`voicei_${message.guild.id}_${member.user.id}`)
      if(date){
      return `\n\`${sayi2++}.\`  <@${member.user.id}>: \`${moment.duration(db.get('voicei_'+message.guild.id+'_'+member.user.id)).format("H [Saat] m [Dakika] s [Saniye]")}\``;
        }
    });
    

const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
.setDescription(`<a:unlem:763804308608909323> **Text Kanallarında İlk 10 Kişi** \n ${mesaj_kişi} \n\n<a:unlem:763804308608909323> **Sesli Kanallarda İlk 10 Kişi** \n ${ses_kişi} `)
.setImage(`https://cdn.discordapp.com/attachments/784570101885960212/784864041952346192/image0.png`)
.setColor("RANDOM");
message.channel.send(embed)
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "top",
  description: "",
  usage: "taslak"
};