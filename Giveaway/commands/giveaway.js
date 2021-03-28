const Client = require('../structures/Client');
const { Message } = require('discord,js');
module.exports = {
    name: `giveaway`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        /*
        <channel mention> <winners> <time> <prize>
        */
       const Channel = message.mentions.channels.first();
       const Winners = parseInt(args[1]);
       let Time = args[2];
       const Prize = args.slice(args(1).join(" ");
       if(!Channel) return message.channel.send(client.embed({ description: `You did not mention a channel!`}, message));
       if(!Winners) return message.channel.send(client.embed({ description: `You did not specify the winners!`}, message));
       if(!Time) return message.channel.send(client.embed({ description: `You did not specify the time!`}, message));
       if(!Prize) return message.channel.send(client.embed({ description: `You did not specify the prize!`}, message));
       Time = client.ms(args[2]);
       const msg = await Channel.send(client.embed({
           title: `New giveaway!`,
           description: `${message.author} is giving away ${Prize} to ${Winners} people!\nTime: ${client.ms(Time, { long: true})}`
       }, message))
       await msg.react("🎉")
       new client.giveaway(client, {
           endsAt: Date.now() + Time,
           channel: Channel.id,
           id: msg.id,
           ended: false,
           end: async() => {
               if(msg.reactions.cache.get('🎉').users.cache.filter(u => u.id != client.user.id).size <= Winners-1) return await msg.edit(client.embed({
                   title: `Giveaway failrd`,
                   description: `Not enough users reacted!`
               }, message))
               const WinningUsers = await msg.reactions.cache.get('🎉').users.cache.filter(u => u.id != client.user.id).random(Winners);
               await msg.edit(client.embed({
                   title: `Giveaway ended!`,
                   description: `${WinningUsers.map(u => u).join(`, `)} just won the giveawy for ${[Prize]}`
               }, message))
           },
           reroll: async() => {
                       if(msg.reactions.cache.get('🎉').users.cache.filter(u => u.id != client.user.id).size <= Winners-1) return await msg.edit(client.embed({
                   title: `Giveaway failrd`,
                   description: `Not enough users reacted!`
               }, message))
               const WinningUsers = await msg.reactions.cache.get('🎉').users.cache.filter(u => u.id != client.user.id).random(Winners);
               await msg.edit(client.embed({
                   title: `Giveaway ended!`,
                   description: `${WinningUsers.map(u => u).join(`, `)} just won the giveawy for ${[Prize]}`
               }, message))    
           },
           winners: Winners
       })
    }
}