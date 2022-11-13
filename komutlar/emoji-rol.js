const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar1 = require('../ayarlar.json')
const ayarlar = ayarlar1.prefix

exports.run = async (client, message,args) => {

let emojirol = await db.fetch(`emoji${message.guild.id}`)
let mesaj = await db.fetch(`mesaj${message.guild.id}`)
let mesajlog = message.mentions.channels.first()
let rol = message.mentions.roles.first()


const embed = new Discord.RichEmbed()
.setColor("RED")
.setDescription(` > **EmojiRol Sistemini Aktif Etmek İçin:** \`${ayarlar}emojirol aç\` \n > **EmojiRol Sistemini DeAktif Etmek İçin:** \`${ayarlar}emojirol kapat\` \n > **EmojiRol Verilecek Rol'ü Ayarlamak için:** \`${ayarlar}emojirol rolayarla @roletiket\` \n > **EmojiRol Komutun Kullanılacağı Kanalı Belirtmek İçin:** \`${ayarlar}emojirol kanalayarla #kanaletiket\` \n > **EmojiRol Mesajını Atmak İçin:** \`${ayarlar}emojirolbaşlat\` `)
.setFooter(`EMİR`, client.user.avatarURL)

if(!args[0]) return message.channel.send(embed);


if(args[0] == 'rolayarla') {
  
  db.set(`emojirol${message.guild.id}`, rol.id)
  message.channel.send(`EmojiRol Rolü ${rol} olarak ayarlandı.`)
  
  return
}



if(args[0] == 'kanalayarla') {

db.set(`mesaj${message.guild.id}`, mesajlog.id)
message.channel.send(`EmojiRol ün Çalışacağı Kanal ${mesajlog} olarak ayarlandı.`)

return
}

if(args[0] == 'kapat') {

db.delete(`emoji${message.guild.id}`)
db.set(`emoji${message.guild.id}`, 'Kapalı')
message.channel.send(`EmojiRol Sistemi Kapatıldı.`)

  return
}
  
if(emojirol == 'Açık') {

message.channel.send(`EmojiRol Sistemi Zaten Aktif!`)

return
  }

if(args[0] == 'aç') {

db.set(`emoji${message.guild.id}`, 'Açık')
message.channel.send(`EmojiRol Sistemi Açıldı`)

return
}

}




module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

module.exports.help = {
  name: 'emojirol',
  description: '',
};