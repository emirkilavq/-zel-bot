 const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (client, message, params, args) => {

  const yardım = new Discord.RichEmbed()
  .setColor(0x36393E)
      .setAuthor(`Raiders Bot`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(`Raiders - Komutlar `,`<a:tk3:759747152112517161>| ${prefix}myrds | Sunucuda yazdığınız owo countlarınızı gösterir.\n<a:tk3:759747152112517161>| ${prefix}günlük-myrds | Sunucuda yazdığınız günlük owo countlarınızı gösterir.\n<a:tk3:759747152112517161>| ${prefix}top | Sunucunun ilk 10 mesaj ve sesli lider sıralamasını gösterir.\n<a:tk3:759747152112517161>**|** ${prefix}topowo **|** Sunucunun owo countlarının lider sıralamasını gösterir.\n<a:tk3:759747152112517161>| ${prefix}düello | 2 kişilik düello maçı düzenler.\n<a:tk3:759747152112517161>| ${prefix}afk | AFK moduna girersiniz.\n<a:tk3:759747152112517161>| ${prefix}anime-ara | Yazdığınız anime karakterinin biyografisini gönderir.\n<a:tk3:759747152112517161>| ${prefix}avatar | Profil fotoğrafınızı gösterir.\n<a:tk3:759747152112517161>| ${prefix}deprem-bilgi | Türkiyede ki son 10 depremi gösterir.\n<a:tk3:759747152112517161>| ${prefix}yılbaşı | Yılbaşına kaç gün kaldığını gösterir.\n<a:tk3:759747152112517161>| ${prefix}tosunpaşa | Tosunpaşa'nın doğum gününe kaç gün kaldığını gösterir.\n<a:tk3:759747152112517161>| ${prefix}sunucu-bilgi | Sunucu hakkında bilgi verir.`) 
  .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
  return message.channel.sendEmbed(yardım);

};

  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yardım',
    description: 'yardım',
    usage: 'yardım'
  };