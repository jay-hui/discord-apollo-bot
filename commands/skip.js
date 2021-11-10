cmd = async (client, message) => {
    let distube = client.distube;

    distube.skip(message);
}

module.exports = {
    name: "skip",
    aliases: ['s'],
    run: cmd
}