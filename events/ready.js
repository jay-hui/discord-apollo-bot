module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`朱主席`, {type: 'LISTENING'});
}