const Discord = require('discord.js');

exports.run = async (client, message, args) => {//

  if(!args[0]) return message.channel.send('Kelime gir.');
  let say = message.content.split(/ +/).slice(1); // boşluklu prefix kullanıyor iseniz .slice(2) yapın
  message.channel.send(`Girdiğin mesajda toplam **`+say.length+'** kelime bulundu.');

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kelimehesapla'],
  permLevel: 0
};
exports.help = {
  name: 'kelime-hesapla'
};// 