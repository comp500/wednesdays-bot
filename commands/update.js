let exec;
let store;
const strings = require("../strings.json");
const tokens = require("../tokens.json");
module.exports = {
	commands: ["update"],
	onReady: (client, modulesList) => {
		exec = modulesList["exec.js"];
		store = modulesList["_store.js"];
		let channelID = store.readKey("restarted");
		if (channelID != null) {
			let channel = client.channels.get(channelID);
			if (channel != null) {
				channel.send("Restarted!");
			}
			store.writeKey("restarted", null);
		}
	},
	onMsg: (inputs, msg) => {
		if (msg.author.id == tokens.ownerid) {
			exec.executeCommand("git pull origin master", (err, output) => {
				if (err) {
					msg.reply(strings.update.error + "```" + err + "```");
				} else {
					msg.reply("```" + output + "```" + strings.update.restarting);
					store.writeKey("restarted", msg.channel.id);
					setTimeout(() => { // Timeout before exit, to send git message
						process.exit(); // Faster to exit rather than to prompt restart
					}, 500);
				}
			});
			//TODO: message after restart
		} else {
			msg.reply(strings.permission);
		}
	}
};