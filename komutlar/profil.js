const Discord = require('discord.js');
const request = require('node-superfetch');

const db = require('quick.db');

const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
  
  let user =  msg.mentions.users.first() || msg.guild.members.get(args[0]) || msg.author
  const kullanıcı = client.users.get(user.id)
  if (user.bot) return msg.channel.send('Bir Botun Profili Olamaz!')
    const owoh = db.fetch(`owoh.${user.id}`) || '0'
     const owob = db.fetch(`owob.${user.id}`) || '0'
      const curse = db.fetch(`course.${user.id}`) || '0'
          const owo = db.fetch(`owo.${user.id}`)
          const hakkımda = db.fetch(`durum.${user.id}`)
    const snekfetch = require('snekfetch')
  const Canvas = require('canvas')
  var canvas = Canvas.createCanvas(1092, 678);
  const ctx = canvas.getContext('2d');
      var {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/784570101885960212/787131877181095936/image0.png");
    const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */
    const { body: deneme } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549216983493640193/al.png");
  const avat = await Canvas.loadImage(deneme);
        const { body: svo } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549241321592717332/border-shield-classic-knight-512_-_Kopya.png");
  const avata = await Canvas.loadImage(svo);
  const { body: buffer } = await snekfetch.get(user.avatarURL || kullanıcı.avatarURL || msg.author.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
    
    ctx.font = "60px Verdana";
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0.3, "black");
gradient.addColorStop(2.2, "black");
gradient.addColorStop(1.0, "black");
ctx.fillStyle = gradient;
 ctx.fillText(`${user.username}`, canvas.width / 2.10, 70 );
  
ctx.font = "50px Verdana";
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0.1, "white");
gradient.addColorStop(0.8, "white");
gradient.addColorStop(1.0, "white");
ctx.fillStyle = gradient;
  
            ctx.fillText(`${owoh || 0}`,  canvas.width / 2.36, 195 );
            ctx.fillText(`Owoh Count`,  canvas.width / 3.20, 135 );
            ctx.fillText(`${owob || 0}`,  canvas.width / 1.28, 195 );
            ctx.fillText(`Owob Count`,  canvas.width / 1.50, 135 );
            ctx.fillText(`${curse || 0}`,  canvas.width / 2.35, 320 );
            ctx.fillText(`Curse Count`,  canvas.width / 3.20, 260 );
            ctx.fillText(`${owo || 0}`,  canvas.width / 1.35, 320 );
            ctx.fillText(`Owo Count`,  canvas.width / 1.50, 260 );
            ctx.fillText(`${hakkımda || `Ayarlanmamış\nAyarlamak için !hakkımda mesaj`}`,  canvas.width / 40, 495 );
            ctx.fillText(`Hakkımda`,  canvas.width / 40, 430 );
            ctx.fillText(`__________`,  canvas.width / 40, 435 );
  const Durum = user.presence.status;
        var Durmm = ''
        if (owo >= 500) {
          if (owo < 1000) {
ctx.drawImage(avat, 100, 290, 100, 100);
          }
        }
            if (owo >= 1000) {
              if (owo < 2000) {
ctx.drawImage(avata, 100, 290, 100, 100);
            }
        }
				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

	
				ctx.lineWidth = 20;
				ctx.arc(150, 160, 120, 0, 2 * Math.PI);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(avatar, 30, 30, 250, 250);
  

  const d = new Discord.Attachment(canvas.toBuffer(), "profil.png");
  msg.channel.send(d)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profile'],
  permLevel: 0
};

exports.help = {
  name: 'profil',
  description: 'Kendi Profilini Görmeyi Görürsünüz.',
  usage: ''
};
