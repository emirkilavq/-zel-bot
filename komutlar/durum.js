const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
   
    let mesaj = args.slice(0).join(' ')

    if(!mesaj) return message.reply("Profilinizde gözükecek bir hakkında mesajı girmelisin")
  if(mesaj.length > 42) return message.channel.send("`40` harften fazla yazamazsın")

    message.channel.send("BIO mesajın `"+mesaj+"` olarak değişti.")
    db.set(`durum.${message.author.id}`, mesaj)

};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "hakkımda",
  description: "",
  usage: "taslak"
}; 