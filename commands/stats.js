const strings = require("../strings.json");
module.exports = {
	commands: ["stats"],
	onMsg: (inputs, msg) => {
		let output = "";
		output += strings.stats.guilds + msg.client.guilds.array().length + "\n";
		output += strings.stats.ping + msg.client.ping + "ms\n";
		output += strings.stats.uptime + (msg.client.uptime / 1000) + "s\n";
		output += strings.stats.platform + process.arch + " " + process.platform + "\n";

		msg.reply(output);
	}
};