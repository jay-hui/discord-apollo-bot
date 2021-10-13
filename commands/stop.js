const Discord = require('discord.js');


cmd = async (client, message) => {
    let distube = client.distube;

    if (!distube.isPlaying(message)) {
        message.channel.send("wtf how do i stop if there's nothing playing??");
        return;
    }
    distube.stop(message);
    message.channel.send("stopped!");
    /*
    let embed = new Discord.MessageEmbed()
        .setImage('https://i.gifer.com/1L7M.gif');
    message.channel.send(embed);
    */
}

module.exports = {
    name: "stop",
    aliases: [],
    run: cmd
}