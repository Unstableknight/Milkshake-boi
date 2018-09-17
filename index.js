const Discord = require("discord.js");
const config = require("Milkshake-boi/config.json");
var bot = new Discord.Client();
bot.on('ready',() => {
  console.log('Im online!');
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;
  
  var args = message.content.substring(prefix.length).split(" ");
  let embed = new Discord.RichEmbed()
  switch (args[0].toLowerCase()) {
    case "ip myth":
        message.channel.send("MILKSHAKELAND134.MC-DNS.NET");
        break;
    case "help":
    let embed = new Discord.RichEmbed()
        .setTitle("Help Menu")
        .setDescription("This is where you can find all the commands!")
        .addField("Prefix", "*")
        .setColor("#9B59B6")
        .addField("ip myth", "Gives you Mythical's MC server IP")
        .addField("test2")
        .addField("test3");

        message.channel.send(embed);
        break;
    case "servers":
    new Discord.RichEmbed()
            .setTitle("Server List")
            .setDescription("This is The Server List!")
            .setColor("#dd6a18")
            .addField("Nates MC Server", "Nateb0b.aternos.me")
            .addField("Mythicals MC server", "MILKSHAKELAND134.MC-DNS.NET");

        message.channel.send(embed);
      break;
    case "info":
    new Discord.RichEmbed()
        .setTitle("Info About Bot!")
        .setColor("#32ff2b")
        .addField("Author", "MilkshakeAddict")
        .addField("DOC", "5/13/18")
        .addField("Author's Discord", "https://discord.gg/PzTZhK")
        .addField("Author's Twitch", "https://www.twitch.tv/milkshake_addict");

    message.channel.send(embed);
    break;
  }


  if (message.content.startsWith(config.prefix + 'setgame')) {
  if(message.author.id !== config.ownerID) return;
    bot.user.setActivity(argresult);
  }
});

bot.login(config.token);
