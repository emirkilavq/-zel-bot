const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
require("moment-duration-format")

module.exports.run = async (client, message, args) => {
    let us =  message.mentions.users.first() || message.guild.members.get(args[0]) || message.author

const kullanıcı = client.users.get(us.id)
let s = db.fetch(`owohs.${us.id}`)
let sa = db.fetch(`owobs.${us.id}`)
let as = db.fetch(`courses.${us.id}`)
let asa = db.fetch(`owos.${us.id}`)
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
  const puan = await db.get("puan_" + message.guild.id + "_" + us.id);

  let sayi22 = 1;
  let top3c = message.guild.channels
    .array()
    .sort((a, b) => {
      return (
        (db.get(`puanuc_${us.id}_${b.id}`) || 0) -
        (db.get(`puanuc_${us.id}_${a.id}`) || 0)
      );
    })
    .map(x => {
      let date = db.get(`puanuc_${us.id}_${x.id}`)
      if(date){
      return `\n<a:tk3:759747152112517161> \`${sayi22++}.\` <#${x.id}>:  \`${db.get(
        `puanuc_${us.id}_${x.id}`
      ) || 0}\``;
      }
    })
    .slice(0, 3);
    
   let sayi4 = 1
  let top4c = message.guild.channels
    .array()
    .sort((a, b) => {
      return (
        (db.get(`voiceuc_${us.id}_${b.id}`) || 0) -
                (db.get(`voiceuc_${us.id}_${a.id}`) || 0)
      );
    })
    .map(x => {
    let date = db.get(`voiceuc_${us.id}_${x.id}`)
      if(date){
      return `\n<a:tk3:759747152112517161> \`${sayi4++}.\` <#${x.id}>:  \`${moment.duration(db.get('voiceuc_'+us.id+'_'+x.id)).format("D [Gün] H [Saat] m [Dakika] s [Saniye]")}\``;
   
      }
    })
    .slice(0, 3);
  let kayıt = db.fetch(`kayıt.${message.author.id}`)
    
    const sess = await db.get('voicei_'+message.guild.id+'_'+us.id)
    const ses = moment.duration(sess).format("H [saat] m [dakika] s [saniye]");
const embed = new Discord.RichEmbed()
.setThumbnail(us.avatarURL || kullanıcı.avatarURL || message.author.avatarURL)
.setDescription(`
<a:sar:752592571402027048> **Kullanıcı :** ${us}
<a:sar:752592571402027048> **Durum:** <:offline:${onl}> ${onl2} 

<a:unlem:763804308608909323> **Owo Komut Kullanım Bilgi**:

<a:tk3:759747152112517161> **Günlük Hunt count** : ${s || 0}
<a:tk3:759747152112517161> **Günlük Battle count** : ${sa || 0}
<a:tk3:759747152112517161> **Günlük Pray/curse count** : ${as || 0}
<a:tk3:759747152112517161> **Günlük Owo count** : ${asa || 0}

<a:tk3:759747152112517161> **Text kanallarında yazdığın toplam mesaj**: \`${puan}\` mesaj
<a:tk3:759747152112517161> **Ses kanallarında geçirdiğin süre**: \`${ses}\`

<a:unlem:763804308608909323> **En Çok Mesaj Attığın 3 Kanal**: ${top3c}

<a:unlem:763804308608909323> **En Çok Durduğun 3 Sesli Kanal**: ${top4c}
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
  name: "günlük-myrds",
  description: "",
  usage: "taslak"
};