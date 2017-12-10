let exec;
let strings = require("../strings.json");
module.exports = {
	commands: ["update"],
	onReady: (client, modulesList) => {
		exec = modulesList["exec.js"];
	},
	onMsg: (inputs, msg) => {
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			exec.executeCommand("git pull origin master", (err, output) => {
				if (err) {
					msg.reply(strings["update"]["error"] + "```" + err + "```");
				} else {
					msg.reply("```" + output + "```" + strings["update"]["restarting"]);
					setTimeout(() => { // Timeout before exit, to send git message
						process.exit(); // Faster to exit rather than to prompt restart
					}, 500);
				}
			});
			//TODO: message after restart
		} else {
			msg.reply("You don't have permission to do that!");
		}
	}
};