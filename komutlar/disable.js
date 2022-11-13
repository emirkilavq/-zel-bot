const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {// Can°B#1308

  if(!args[0]) return message.channel.send('You need to specify one or more args[0]s to enable.');

  let cmd;
  if(client.commands.has(args[0])) { cmd = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) { cmd = client.commands.get(client.aliases.get(args[0]))};

  if(!cmd) return message.channel.send('Could not find a args[0] with that name.');
  if(cmd === 'disable') return message.channel.send('Cannot disable this command.');
  let nbr;
  data.set(`kapalı.${cmd.help.name}.${message.guild.id}`, 'oq');
  if(cmd.conf.aliases) { 
  nbr = ' ('+cmd.conf.aliases.map(c => c).join(', ')+')';
  cmd.conf.aliases.forEach(s => { data.set(`kapalı.${s}.${message.guild.id}`, 'oq')}) };

  message.channel.send(`Disabled **${cmd.help.name}**${nbr}.`);

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'disable'
};