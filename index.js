const Discord = require('discord.js'),
    client = new Discord.Client(),
    DisTube = require('distube'),
    { loadCommands } = require('./utils/loadCommands');
client.distube = new DisTube(client, {
    searchSongs: 5,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnStop: true
});
const distube = client.distube;

const status = (queue) => `volume: \`${queue.volume}%\``;
// const status = (queue) => `volume: \`${queue.volume}%\` | filter: \`${queue.filter || "off"}\` | loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "queue" : "this song" : "off"}\` | autoplay: \`${queue.autoplay ? "on" : "off"}\``;
// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => {
        distube.setRepeatMode(message, 0);
        if (distube.toggleAutoplay(message)) distube.toggleAutoplay(message);
        message.channel.send(`playing \`${song.name}\` - \`${song.formattedDuration}\`\nrequested by: ${song.user}\n${status(queue)}`)
    })
    .on("addSong", (message, queue, song) => message.channel.send(
        `added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nrequested by: ${song.user}\nnow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("searchResult", (message, result) => {
        message.channel.send(`**which song do u wanna listen to? (type the number)**\n${result.slice(0, 5).map((song, index) => `**${index + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`search cancelled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("error encountered: " + e);
    });

require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.login(process.env.TOKEN || require('./settings.json').token);