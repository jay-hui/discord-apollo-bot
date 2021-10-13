cmd = async (client, message, args) => {
    let distube = client.distube;

    let volume = distube.setVolume(message, args[0]);
    message.channel.send(`current volume: ${volume.volume}%`);
}

module.exports = {
    name: "volume",
    aliases: ['v'],
    run: cmd
}