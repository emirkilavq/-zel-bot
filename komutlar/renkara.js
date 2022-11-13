const { RichEmbed } = require("discord.js");
const önEk = require("../ayarlar.json").prefix;
exports.run = (client, message, args) => {
  var Renk = args[0];
  var hata = args[0];
  var renkResimi = `https://dummyimage.com/1920x1080/${Renk}/ffffff&text=%20`;

  if (!hata) {
    const renkYok = new RichEmbed()
      .setColor("RED")
      .addField(
        `**${client.user.username} | Renk Komutu**`,
        `Lütfen Bir Renk Belirtin!\nÖrnek: \`${önEk}renk #ffffff\``
      )
      .setFooter(client.user.username)
      .setThumbnail(client.user.avatarURL)
      .setTimestamp();

    message.channel.send(renkYok);
  }
  if (Renk) {
    message.channel.send(
      new RichEmbed()
        .setColor(Renk)
        .setTitle(`**İşte ${args[0]} Rengi**`)
        .setURL(renkResimi)
        .setImage(renkResimi)
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}; //Dcs Ekibi

exports.help = {
  name: "renk"
};