const exec = require("child_process").exec;
let selfInstance = {
	commands: ["exec"],
	executeCommand: (input, callback) => {
		if (callback) {
			exec(input, callback);
		} else {
			exec(input);
		}
	},
	onMsg: (inputs, msg) => {
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			if (inputs.length > 0) {
				selfInstance.executeCommand(inputs.join(" "), (err, output) => {
					if (err) {
						msg.reply(require("../strings.json")["update"]["error"] + "```" + err + "```");
					} else {
						msg.reply("```" + output + "```");
					}
				});
			} else {
				msg.reply("No command specified");
			}
		} else {
			msg.reply("You don't have permission to do that!");
		}
	}
};
module.exports = selfInstance;