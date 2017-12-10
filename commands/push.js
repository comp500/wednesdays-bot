let store;
const strings = require("../strings.json");
const tokens = require("../tokens.json");
module.exports = {
	commands: ["push"],
	onReady: (client, modulesList) => {
		// import globally require'd module
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			// get internal store
			let internalStore = store.getStore();
			if (internalStore.subscriptions) {
				// loop over subscriptions
				internalStore.subscriptions.forEach((element) => {
					let channel = msg.client.channels.get(element.channel);
					if (channel) {
						// send message to be pushed
						channel.send(inputs.join(" "));
					} else {
						// if failed, state failure
						// NOTE: this seems to fail for DM channels unless a message has been sent in it since the bot was started
						msg.reply(strings.push.fail + element.channel);
					}
				});
				msg.reply(strings.push.success);
			} else {
				msg.reply(strings.push.nosub);
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};