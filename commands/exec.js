const exec = require("child_process").exec;
const tokens = require("../tokens.json");
const strings = require("../strings.json");
let selfInstance = {
	commands: ["exec"],
	executeCommand: (input, callback) => {
		// this is probably useless, I should probably remove it
		// could be useful for sanitation / path changing, however, later
		if (callback) {
			exec(input, callback);
		} else {
			exec(input);
		}
	},
	onMsg: (inputs, msg) => {
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			if (inputs.length > 0) {
				// exec given inputs
				selfInstance.executeCommand(inputs.join(" "), (err, output) => {
					if (err) {
						// if error, print error
						msg.reply(strings.exec.error + "\n`" + err + "`");
					} else {
						// print output from command
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
// used to make functions accessible to self, because 'this' is broken
module.exports = selfInstance;