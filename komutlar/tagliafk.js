const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emir = require('quick.db');

exports.run = async(client, message, args) => {
let warforcode = message
let emir2 = args.slice(0).join(' ')
if(!emir2) return warforcode.channel.send("Lütfen bir sebep belirt")

warforcode.channel.send("Başarıyla "+emir2+" sebebiyle AFK durumundasın")
warforcode.member.setNickname(`AFK | ${warforcode.author.username}`);
emir.set(`warforcodeafk_${warforcode.author.id}, emir2`)

}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'bakımdaafk',
description: 'Taglı Afk',
usage: 'afk'
};