const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
require("moment-duration-format")

module.exports.run = async (client, message, args) => {
let us = message.author
const kullanıcı = client.users.get(us.id)
let s = db.fetch(`owohsu.${message.guild.id}`)
let sa = db.fetch(`owobsu.${message.guild.id}`)
let as = db.fetch(`coursesu.${message.guild.id}`)
let asa = db.fetch(`owosu.${message.guild.id}`)
/*let userinfo = {};
userinfo.status = us.presence.status.toString()
        .replace("dnd", `Rahatsız Etmeyin `)
        .replace("online", `Çevrimiçi`)
        .replace("idle", `Boşta`) */

var Durum = us.presence.status; 

let onl;
if(Durum === 'idle') onl = "784796746106011678"
if(Durum === 'dnd') onl = "784796761280872458" 
if(Durum === 'online') onl = "784796732361801740"
if(Durum=== 'offline') onl = "784796715742920774"
  


let onl2;
if(Durum === 'idle') onl2 = "Boşta"
if(Durum === 'dnd') onl2 = "Rahatsız Etmeyin" 
if(Durum === 'online') onl2 = "Çevrimiçi"
if(Durum=== 'offline') onl2 = "Çevrimdışı"
 let info = moment.utc(message.guild.members.get(us.id).user.createdAt).format('(**DD/MM/YYYY**)')

const embed = new Discord.RichEmbed()
.setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
.setDescription(`

<a:unlem:763804308608909323> **Owo Komut Kullanım Bilgi**:

<a:tk3:759747152112517161> **Genel Hunt count** : ${s || 0}
<a:tk3:759747152112517161> **Genel  Battle count** : ${sa || 0}
<a:tk3:759747152112517161> **Genel  Pray/curse count** : ${as || 0}
<a:tk3:759747152112517161> **Genel  Owo count** : ${asa || 0}


`)
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
  name: "genel-myrds",
  description: "",
  usage: "taslak"
};