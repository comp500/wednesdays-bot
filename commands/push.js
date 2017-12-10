let store;
const strings = require("../strings.json");
const tokens = require("../tokens.json");
module.exports = {
	commands: ["push"],
	onReady: (client, modulesList) => {
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		if (msg.author.id == tokens.ownerid) {
			let internalStore = store.getStore();
			if (internalStore.subscriptions) {
				internalStore.subscriptions.forEach((element) => {
					let channel = msg.client.channels.get(element.channel);
					if (channel) {
						channel.send(inputs.join(" "));
					} else {
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