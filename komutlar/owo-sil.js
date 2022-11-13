const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

//KOMUT ÇOK GELİŞMİŞ BİR KOMUT DEĞİL

exports.run = async (client, message, args) => {
  var embed2 = new Discord.RichEmbed()   
      .setTitle('Merhaba,' + message.member.user.username)
      .setDescription('sadece belirli kişiler bu komutu kullanabilir! ')
      .setColor('RED') 
  

  if(message.author.id !== "349265840685842432") if(message.author.id !== "564304390756892694") return message.channel.sendEmbed(embed2)
  const silinecekkllnc = message.mentions.members.first();
  let para = args[1]
  if(!silinecekkllnc) return message.channel.send(`Bir kullanıcı belirtmelisin!`)
  const owo = await db.fetch(`owo.${silinecekkllnc.id}`);
  
  await db.add(`owo.${silinecekkllnc.id}`, -para)
  
  
  message.channel.send(`:+1:`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'sil',
    description: 'Kullanıcıların kullanıcı adını tarar.',
    usage: 'tag-taraması <tag>'
}