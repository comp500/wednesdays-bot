module.exports = {
	commands: ["stats"],
	onMsg: (inputs, msg) => {
		let output = "";
		output += "Guilds: " + msg.client.guilds.array().length + "\n";
		output += "Ping: " + msg.client.ping + "ms\n";
		output += "Uptime: " + (msg.client.uptime / 1000) + "s\n";
		output += "Running on " + process.arch + " " + process.platform + "\n";

		msg.reply(output);
	}
};