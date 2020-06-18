const Discord = require('discord.js')
const client = new Discord.Client
const config = require('./config.json')

const fs = require('fs')
client.commands = new Discord.Collection

fs.readdir('./Commands/', (error, f) => {
    if (error) { return console.error(error); }
    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

    commandes.forEach((f) => {
        let commande = require(`./Commands/${f}`);
        console.log(`${f} | 🆗`);
        let commandName = f.split(".")[0];
        client.commands.set(commandName, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if (error) {
        return console.error(error);
    }
    console.log(`Fichier d'event ${f} chargé avec succès !`);

    f.forEach(f => {
        let events = require(`./Events/${f}`);
        let event = f.split(".")[0];
        client.on(event, events.bind(null, client));
    });
});

client.login(config.token)

// statut
client.on('ready', () => {
    client.user.setActivity(`${client.users.cache.size} users | ${client.guilds.cache.size} servers`, { type: "WATCHING" })
})

// message
client.on("message", async message => {

})