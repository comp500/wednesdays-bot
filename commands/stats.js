const strings = require("../strings.json");
let store;
module.exports = {
	commands: ["stats"],
	onReady: (client, modulesList) => {
		// import globally require'd module, for subscription counting
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		let output = "";
		// print out stats using strings.stats as labels
		output += strings.stats.guilds + msg.client.guilds.array().length + "\n";
		let subscriptions = store.readKey("subscriptions");
		if (subscriptions) {
			output += strings.stats.subbed + subscriptions.length + "\n";
		}
		output += strings.stats.ping + msg.client.ping + "ms\n";
		output += strings.stats.uptime + (msg.client.uptime / 1000) + "s\n";
		output += strings.stats.platform + process.arch + " " + process.platform + "\n";

		// reply with output
		msg.reply(output);
	}
};