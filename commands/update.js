let exec;
let store;
const strings = require("../strings.json");
const tokens = require("../tokens.json");
module.exports = {
	commands: ["update"],
	onReady: (client, modulesList) => {
		// import globally require'd modules
		exec = modulesList["exec.js"];
		store = modulesList["_store.js"];
		// if just restarted
		let channelID = store.readKey("restarted");
		if (channelID != null) {
			let channel = client.channels.get(channelID);
			if (channel != null) {
				// tell me that restart has finished
				channel.send("Restarted!");
			}
			store.writeKey("restarted", null);
		}
	},
	onMsg: (inputs, msg) => {
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			// pull from git
			exec.executeCommand("git pull origin master", (err, output) => {
				if (err) {
					// print error
					msg.reply(strings.update.error + "```" + err + "```");
				} else {
					// print output
					msg.reply("```" + output + "```" + strings.update.restarting);
					// record that bot just restarted
					store.writeKey("restarted", msg.channel.id);
					setTimeout(() => { // Timeout before exit, to send git message
						process.exit(); // Faster to exit rather than to prompt restart
						// Only usable if you run it with pm2 or forever or some bash script
					}, 500);
				}
			});
		} else {
			msg.reply(strings.permission);
		}
	}
};