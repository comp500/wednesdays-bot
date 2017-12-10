const strings = require("../strings.json");
let store;
module.exports = {
	commands: ["stats"],
	onReady: (client, modulesList) => {
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		let output = "";
		output += strings.stats.guilds + msg.client.guilds.array().length + "\n";
		let subscriptions = store.readKey("subscriptions");
		if (subscriptions) {
			output += strings.stats.subbed + subscriptions.length + "\n";
		}
		output += strings.stats.ping + msg.client.ping + "ms\n";
		output += strings.stats.uptime + (msg.client.uptime / 1000) + "s\n";
		output += strings.stats.platform + process.arch + " " + process.platform + "\n";

		msg.reply(output);
	}
};