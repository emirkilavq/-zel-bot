//consts (for glitch)
// GEREKLİ YERLER
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

var prefix = ayarlar.prefix;

const log = (message) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", (e) => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", (e) => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on("ready", () => require("quick.db").set("start", Date.now()));

client.on("ready", () => {
  client.channels.get("811941716667662346").join();
});

client.on("message", (message) => {
  let kanal = "787480959665963113";
  let bot = "159985870458322944";
  if (message.channel.id !== kanal) return;
  if (message.author.id !== bot) return;

  let kul = message.guild.members.get(message.mentions.users.first().id);
  let logkanal = client.channels.get("796276714242179092");
  let mesaj = message.content;
  let level = mesaj.substr(mesaj.length - 7).replace(/[^0-9]/g, "");
  let leveller = {
    10: "787461661342040124",
    20: "787462088972435466",
    30: "787463867654995988",
    40: "787465136901849119",
    50: "787466375207321661",
    60: "787467487679086673",
    70: "787468256633946142",
    80: "787469459107086356",
    90: "787469075760414820",
    100: "787470052026220555",
  };

  if (level == 10) {
    let ver = leveller[level];
    kul.addRole(ver);
    logkanal.send(
      `${kul} kullanıcısı **${level}** level olmuş <@&${ver}> rolünü verdim`
    );
  } else if (level >= 20) {
    if (!Object.keys(leveller).includes(level)) return;
    let al = leveller[`${level - 10}`];
    let ver = leveller[level];
    kul.removeRole(al);
    kul.addRole(ver);
    logkanal.send(
      `${kul} kullanıcısı **${level}** level olmuş <@&${ver}> rolünü verdim`
    );
  }
});

client.on("message", (message) => {
  if (!message.author.bot) return;
  let usdurum = db.get(`usohbet_${message.channel.id}`);
  if (!usdurum || usdurum === "pasif") return;
  else {
    message.delete(5000);
  }
});

client.on("message", async (message) => {
  const ms = require("parse-ms");

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    let süre = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = ms(Date.now() - süre);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.member.setNickname(db.fetch(`afktag_${message.author.id}`));
    if (db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_cikis = new Discord.RichEmbed()
        .setColor("000001")
        .setTitle(`**${message.author.tag}** - **AFK Çıkış**`)
        .setDescription(
          `<a:tk3:759747152112517161> <@${message.author.id}> **${zaman.hours}** **saat** ${zaman.minutes} **dakika** ${zaman.seconds} **saniye** **AFK Modundaydın!**`
        )
        .setThumbnail(`${message.guild.iconURL}`)
        .setFooter(`${message.guild.name}`);
      message.channel.send(afk_cikis);
    }
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.fetch(`afk_${kullanıcı.id}`);

  if (sebep) {
    let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
    let zaman = ms(Date.now() - süre);
    if (db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_uyarı = new Discord.RichEmbed()
        .setColor("000001")
        .setTitle(`**${kullanıcı.tag}** - **Şuan AFK**`)
        .setDescription(
          `<a:tk3:759747152112517161> <@${kullanıcı.id}> adlı kullanıcı **${sebep}** sebebiyle; **${zaman.hours}** **saat**  **${zaman.minutes}** **dakika** **${zaman.seconds}** **saniyedir AFK!**`
        )
        .setThumbnail(`${message.guild.iconURL}`)
        .setFooter(`${message.guild.name}`);
      message.reply(afk_uyarı);
    }
  }
});

client.on("message", (message) => {
  if (message.content === `${client.user.id}`) {
    message.reply("beni etiketlemek senin ne haddine?");
  }
});

client.on("message", async (msg) => {
  if (msg.content.toLowerCase() === "sa") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});

const logs = require("discord-logs");
logs(client);

client.on("guildMemberBoost", (member) => {
  // Can°B#1308
  let kanal = client.channels.get("1030767726890860564");
  kanal.send(
    `**${member.name.tag}** kullanıcısı **${member.guild.name}** sunucusuna boost bastı!`
  );
  member.send(
    `${member.guild.name} sunucusuna boost bastığın için teşekkürler!`
  );
}); //

client.on("ready", async () => {
  const mesajlar = [
    "belki biraz seni kıskanmış olabilirimmm. Ama çok harikasın neden kıskanmayayım :(",
    "iyiki varsın ❤",
    "bana kalbine giden yolu tarif eder misin?",
    "şu sunucuda birşeyi kıskanıyorum o da senin müthişliğin ya",
    "seni bir yemeğe çıkarabilir miyim?",
    "aşk kaç beden giyer",
    "güzelliğin gözlerimi kamaştırdı beh!",
    "karıncalar göbüşünü yesin senin :P",
    "peki şey bu hep böyle mi gidecek arkadaş mıyız hala :(",
    "sence de biraz fazla gergin değil misin bugün? Az sakin olsana canım.",
    "elimde yüzük, kalbimde sen. Benimle evlenir misin?",
    "şimdi sana yürüsem ne yapabilirsin he?",
    "ben sana düştüm ama ya napcaz",
    "canın yandı mı? Cennetten düşmüş gibi bir halin var",
    "çok tatlısın",
    "senin evin yok mu sürekli aklımdasın?",
    "biliyorum bana karşı boş değilsin ama sevgilim var",
    "bazen bu kadar harika olmanı kıskanıyorum diyebilirim.",
    "bi sarılsak mı ya sana ihtiyacım var",
    "buraya yeni geldim, yabancıyım yani, bana kalbinin yolunu tarif eder misin?",
    "ayyyyyyyy çok şekersinnnnnnn",
    "kendini sevmelisin. Çünkü ben seni çok seviyorum.",
    "1 milyon lira verseler yinede gülüşünle değişmem.",
    "güneşim olur musun yani benden uzak dur hıh -,-",
    "çok sinirlendim ama seni görünce pamuk gibi oldum be",
    "of ya sıkıldım benimle ilgilen",
    "koş koş seni aldatıyorum",
    "yataktan paraşütle mi iniyorsun? Gözüme biraz 1.55 gibi geldin de.",
    "bu kadar şeker olmak zorunda mısın?",
    "of tamam git onunla konuş, belli ki yeni sevgili yapmışsın. Yazmasana bana bir daha?",
  ];

  setInterval(() => {
    const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];

    const server = client.guilds.get("716994691488546908");

    const i = server.members.random().id;

    server.channels.get("1030767726890860564").send("<@" + i + "> " + mesaj);
  }, 1800000); //1000 = 1 Saniye
});

const ms = require("parse-ms");
client.on("message", async (message) => {
  const reklam = ["owoh", "OWOH", "Owoh", "WH", "Wh", "wh"];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre1_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 15000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }

    db.add(`owoh.${message.author.id}`, 1);
    db.set(`süre1_${message.author.id}`, Date.now());
    db.add(`owohsu.${message.guild.id}`, 1);
  }
});

client.on("message", async (message) => {
  const reklam = ["owob", "OWOB", "Owob", "wb", "WB", "Wb"];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre2_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 15000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }

    db.add(`owob.${message.author.id}`, 1);
    db.set(`süre2_${message.author.id}`, Date.now());
    db.add(`owobsu.${message.guild.id}`, 1);
  }
});

client.on("message", async (message) => {
  const reklam = [
    "pray",
    "PRAY",
    "Pray",
    "Course",
    "COURSE",
    "course",
    "curse",
    "Curse",
    "CURSE",
  ];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre3_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 300000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }
    db.add(`course.${message.author.id}`, 1);
    db.set(`süre3_${message.author.id}`, Date.now());
    db.add(`coursesu.${message.guild.id}`, 1);
  }
});

client.on("message", async (message) => {
  const reklam = ["owo", "OWO", "Owo", "w", "W"];

  const reklam2 = [
    "pray",
    "PRAY",
    "Pray",
    "curse",
    "CURSE",
    "Curse",
    "wcurse",
    "owob",
    "OWOB",
    "owoh",
    "OWOH",
    "Owoh",
    "ovoh",
    "OVOH",
    "Ovoh",
    "Owob",
    "WB",
    "Wb",
    "wb",
    "owoh",
    "OWOH",
    "Owoh",
    "wh",
    "WH",
    "Wh",
    "owoh",
    "OWOH",
    "Owoh",
  ];

  if (reklam2.some((word2) => message.content.includes(word2))) return;

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre4_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 10000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }
    db.add(`owo.${message.author.id}`, 1);
    db.set(`süre4_${message.author.id}`, Date.now());
    db.add(`owosu.${message.guild.id}`, 1);
  }
});

///günlük

client.on("message", async (message) => {
  const reklam = ["owoh", "OWOH", "Owoh", "WH", "Wh", "wh"];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre1s_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 15000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }

    db.add(`owohs.${message.author.id}`, 1);
    db.set(`süre1s_${message.author.id}`, Date.now());
  }
});

client.on("message", async (message) => {
  const reklam = ["owob", "OWOB", "Owob", "wb", "WB", "Wb"];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre2s_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 15000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }

    db.add(`owobs.${message.author.id}`, 1);
    db.set(`süre2s_${message.author.id}`, Date.now());
  }
});

client.on("message", async (message) => {
  const reklam = [
    "pray",
    "PRAY",
    "Pray",
    "Course",
    "COURSE",
    "course",
    "curse",
    "Curse",
    "CURSE",
  ];

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre3s_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 300000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }
    db.add(`courses.${message.author.id}`, 1);
    db.set(`süre3s_${message.author.id}`, Date.now());
  }
});

client.on("message", async (message) => {
  const reklam = ["owo", "OWO", "Owo", "w", "W"];

  const reklam2 = [
    "pray",
    "PRAY",
    "Pray",
    "curse",
    "CURSE",
    "Curse",
    "wcurse",
    "owob",
    "OWOB",
    "Owob",
    "WB",
    "Wb",
    "wb",
    "owoh",
    "OWOH",
    "Owoh",
    "wh",
    "WH",
    "Wh",
  ];

  if (reklam2.some((word2) => message.content.includes(word2))) return;

  if (reklam.some((word) => message.content.includes(word))) {
    let süre = db.fetch(`süre4s_${message.author.id}`);
    let kalan = Date.now() - süre;
    let timeout = 10000;

    if (süre !== null && timeout - (Date.now() - süre) > 0) {
      let time = ms(timeout - (Date.now() - süre));

      return;
    }
    db.add(`owos.${message.author.id}`, 1);
    db.set(`süre4s_${message.author.id}`, Date.now());
  }
});

setInterval(async () => {
  var mem = [];
  client.guilds.forEach(async (guild) => {
    guild.members.forEach(async (member) => {
      db.delete(`owohs.${member.id}`);
      db.delete(`owobs.${member.id}`);
      db.delete(`courses.${member.id}`);
      db.delete(`owos.${member.id}`);
    });
  });
}, 86400000); // 1000 = 1 sn //86400000

///////////

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (!oldMember.user.bot) {
    let oldChannel = oldMember.voiceChannel;

    let newChannel = newMember.voiceChannel;

    if (oldChannel === undefined && newChannel !== undefined) {
      db.set(`girisses.${oldMember.user.id}.${oldMember.guild.id}`, Date.now());
    } else if (newChannel === undefined) {
      let ilksessüre = await db.fetch(
        `girisses.${oldMember.user.id}.${oldMember.guild.id}`
      );

      let time = Date.now() - ilksessüre;
      await db.add(
        "voicei_" + oldMember.guild.id + "_" + oldMember.user.id,
        time
      );

      await db.add(
        "voicec_" + oldMember.guild.id + "_" + oldMember.voiceChannelID,
        time
      );

      await db.add(
        "voiceuc_" + oldMember.user.id + "_" + oldMember.voiceChannelID,

        time
      );
    }
  }
});

client.on("message", async (message) => {
  if (message.author.bot === false) {
    await db.add(`puan_${message.guild.id}_${message.author.id}`, 1);

    await db.add(`puanc_${message.guild.id}_${message.channel.id}`, 1);

    await db.add(`puanuc_${message.author.id}_${message.channel.id}`, 1);
  }
});

client.login(ayarlar.token);
