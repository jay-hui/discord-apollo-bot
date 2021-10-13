cmd = async (client, message, args) => {
    let distube = client.distube;

    let queue = distube.getQueue(message);
    message.channel.send('queue:\n' + queue.songs.map((song, id) =>
        `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
    ).slice(0, 10).join("\n"));
}

module.exports = {
    name: "queue",
    aliases: ['q'],
    run: cmd
}