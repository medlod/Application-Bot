const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const guildID = '';
const token = '';

//Ready Event
client.on('ready', () => {
    console.log('Application bot ready!')
});

//Message Event
client.on('message', async message => {
    //args
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //commands
    if(command === 'apply') {
        //Has to be in DMs
        if(message.channel.type != 'dm') {
            message.channel.send('Use this command in DMs!');
            return;
        }
        message.author.send('Application started!');

        //First Question
        await message.author.send('How old are you?');
        let answer = await message.channel.awaitMessages(answer => answer.author.id != client.user.id,  {max: 1});
        const age = (answer.map(answers => answers.content).join());

        //Second Question
        await message.author.send('Whats your name?');
        answer = await message.channel.awaitMessages(answer => answer.author.id != client.user.id,  {max: 1});
        const name = (answer.map(answers => answers.content).join());

        //Third Question
        await message.author.send('Where do you live?');
        answer = await message.channel.awaitMessages(answer => answer.author.id != client.user.id,  {max: 1});
        const location = (answer.map(answers => answers.content).join());

        //Embed
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Age', age)
        .addField('Name', name)
        .addField('Location', location)
        .setTimestamp()
        .setColor('RED');

        //Sending Embed
        const guild = client.guilds.get(guildID);
        await guild.channels.find(channel => channel.name === 'applications').send(embed);
    }
});

//Log In
client.login(token);