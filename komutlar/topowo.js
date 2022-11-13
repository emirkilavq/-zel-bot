const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
require("moment-duration-format")
module.exports.run = async (client, message, args) => {

  let owoh = 1
  let owoh2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`owoh.${b.user.id}`) || 0) -
        (db.get(`owoh.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`owoh.${member.user.id}`)
      if(date){
      return `\n\`${owoh++}.\`  <@${member.user.id}>:  \`${db.get(
        `owoh.${member.user.id}`
      )}\` Mesaj`;
        }
    });

let owob = 1
  let owob2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`owob.${b.user.id}`) || 0) -
        (db.get(`owob.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`owob.${member.user.id}`)
      if(date){
      return `\n\`${owob++}.\`  <@${member.user.id}>:  \`${db.get(
        `owob.${member.user.id}`
      )}\` Mesaj`;
        }
    });
  
    let curse = 1
  let curse2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`course.${b.user.id}`) || 0) -
        (db.get(`course.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`course.${member.user.id}`)
      if(date){
      return `\n\`${curse++}.\`  <@${member.user.id}>:  \`${db.get(
        `course.${member.user.id}`
      )}\` Mesaj`;
        }
    });

  let owo = 1
  let owo2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`owo.${b.user.id}`) || 0) -
        (db.get(`owo.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`owo.${member.user.id}`)
      if(date){
      return `\n\`${owo++}.\`  <@${member.user.id}>:  \`${db.get(
        `owo.${member.user.id}`
      )}\` Mesaj`;
        }
    });
  
const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
.setDescription(`<a:unlem:763804308608909323> **En Çok Owoh Yazan 5 Kişi** \n ${owoh2} \n\n<a:unlem:763804308608909323> **En Çok Owob Yazan 5 Kişi** \n ${owob2}\n\n<a:unlem:763804308608909323> **En Çok Pray/Curse Yazan 5 Kişi** \n ${curse2} \n\n<a:unlem:763804308608909323> **En Çok Owo Yazan 5 Kişi** \n ${owo2} `)
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
  name: "topowo",
  description: "",
  usage: "taslak"
};