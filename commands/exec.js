const exec = require("child_process").exec;
const tokens = require("../tokens.json");
const strings = require("../strings.json");
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
		if (msg.author.id == tokens.ownerid) {
			if (inputs.length > 0) {
				selfInstance.executeCommand(inputs.join(" "), (err, output) => {
					if (err) {
						msg.reply(strings.exec.error + "\n`" + err + "`");
					} else {
						msg.reply("```" + output + "```");
					}
				});
			} else {
				msg.reply(strings.exec.empty);
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};
module.exports = selfInstance;