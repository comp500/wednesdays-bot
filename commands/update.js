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
					exec.executeCommand("pm2 restart index");
				}
			});
			//TODO: message after restart
		} else {
			msg.reply("You don't have permission to do that!");
		}
	}
};