const Discord = require("discord.js");
const config = require("./config.json");
const YTDL = require("ytdl-core")


var bot = new Discord.Client();

function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

  server.queue.shift();

  server.dispatcher.on("end", function () {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

var servers = {};

bot.on('ready', () => {
  console.log('Im online!');
});

bot.on("message", function (message) {
  if (message.author.equals(bot.user)) return;
  if (!message.content.startsWith(config.prefix)) return;

  var args = message.content.substring(config.prefix.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "milkip":
      message.channel.send("MILKSHAKELAND134.MC-DNS.NET");
      break;
    case "help":
      let embed = new Discord.RichEmbed()
        .setTitle("Help Menu")
        .setDescription("This is where you can find all the commands!")
        .addField("Prefix", "*")
        .setColor("#9B59B6")
        .addField("milkip", "Gives you Mythical's MC server IP")
        .addField("test2")
        .addField("test3");

      message.channel.send(embed);
      break;
    case "servers":
      let embed3 = new Discord.RichEmbed()
        .setTitle("Server List")
        .setDescription("This is The Server List!")
        .setColor("#dd6a18")
        .addField("Nates MC Server", "Nateb0b.aternos.me")
        .addField("Mythicals MC server", "MILKSHAKELAND134.MC-DNS.NET");

      message.channel.send(embed3);
      break;
    case "info":
      let embed2 = new Discord.RichEmbed()
        .setTitle("Info About Bot!")
        .setColor("#32ff2b")
        .addField("Author", "MilkshakeAddict")
        .addField("DOC", "5/13/18")
        .addField("Author's Discord", "https://discord.gg/PzTZhK")
        .addField("Author's Twitch", "https://www.twitch.tv/milkshake_addict");

      message.channel.send(embed2);
      break;
    case "play":
      if (!args[1]) {
        message.channel.sendMessage("Error: Please Provide a link")
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.sendMessage("Error: You must be in a voice channel")
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      var servers = servers[message.guild.id];

      server.queue.push(args[1]);

      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
        play(connection, message);
      });
      break;
    case "skip":
      var server = servers[message.guild.id];


      if (server.dispatcher) server.dispatcher.end();
      break;
    case "stop":
      var server = servers[message.guild.id];

      if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      break;
    default:
      message.channel.send("Error: Invaild Command")
  }
});

bot.login(config.token);
