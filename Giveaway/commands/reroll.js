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
        const MessageID = args[0];
        if(!MessageID) return message.channel.send(client.embed({ description: `You did not specify a message id!` }, message));
        const Giveaway = client.giveaways.get(MessageID);
        if(!Giveaway || !Giveaway.ended) return message.channel.send(client.embed({ description: `That giveaway doesn't exist or hasn't ended! `}, message));
        await Giveaway.reroll();
        await message.channel.send(client.embed({ description: `Successfuly rerolled!` }, message));
    }
}