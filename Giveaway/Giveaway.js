const GiveawayClient = require('./Client');
const Client = require('./Client');
class Giveaway {
    /**
     * 
     * @param {Client} client 
     * @param {Object} options 
     */
    constructor(client, options) {
        client.giveaways.set(options.id, options);
    }
};
module.exports = Giveaway;