const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
require("moment-duration-format")
module.exports.run = async (client, message, args) => {

  let owohs = 1
  let owohs2 = message.guild.members
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
      let date = db.get(`owohs.${member.user.id}`)
      if(date){
      return `\n\`${owohs++}.\`  <@${member.user.id}>:  \`${db.get(
        `owohs.${member.user.id}`
      )}\` Mesaj`;
        }
    });

let owobs = 1
  let owobs2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`owobs.${b.user.id}`) || 0) -
        (db.get(`owobs.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`owobs.${member.user.id}`)
      if(date){
      return `\n\`${owobs++}.\`  <@${member.user.id}>:  \`${db.get(
        `owobs.${member.user.id}`
      )}\` Mesaj`;
        }
    });
  
    let curse = 1
  let curse2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
            return (
        (db.get(`courses.${b.user.id}`) || 0) -
        (db.get(`courses.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`courses.${member.user.id}`)
      if(date){
      return `\n\`${curse++}.\`  <@${member.user.id}>:  \`${db.get(
        `courses.${member.user.id}`
      )}\` Mesaj`;
        }
    });

  let owo = 1
  let owo2 = message.guild.members
    .filter(mem => !mem.user.bot)
    .array()
    .sort((a, b) => {
      return (
        (db.get(`owos.${b.user.id}`) || 0) -
        (db.get(`owos.${a.user.id}`) || 0)
      );
    })
    .slice(0, 5)
    .map(member => {
      let date = db.get(`owos.${member.user.id}`)
      if(date){
      return `\n\`${owo++}.\`  <@${member.user.id}>:  \`${db.get(
        `owos.${member.user.id}`
      )}\` Mesaj`;
        }
    });
  
const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
.setDescription(`<a:unlem:763804308608909323> **1 G??nde En ??ok Owoh Yazan 5 Ki??i** \n ${owohs2} \n\n<a:unlem:763804308608909323> **1 G??nde En ??ok Owob Yazan 5 Ki??i** \n ${owobs2}\n\n<a:unlem:763804308608909323> **1 G??nde En ??ok Pray/Curse Yazan 5 Ki??i** \n ${curse2} \n\n<a:unlem:763804308608909323> **1 G??nde En ??ok Owo Yazan 5 Ki??i** \n ${owo2} `)
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
  name: "g??nl??k-topowo",
  description: "",
  usage: "taslak"
};