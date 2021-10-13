cmd = async (client, message, args) => {
    let distube = client.distube;

    if (!message.member.voice.channel) return message.channel.send('why u no join call b4 choosing song ;-;');
    distube.play(message, args.join(" "));
}

module.exports = {
    name: "play",
    aliases: ['p'],
    run: cmd
}