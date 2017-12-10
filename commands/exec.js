const exec = require("child_process").exec;
module.exports = {
	commands: ["exec"],
	executeCommand: (input, callback) => {
		if (callback) {
			exec(input, callback);
		} else {
			exec(input);
		}
	}//,
/*	onMsg: function (inputs, msg) {
		if (inputs.length > 0) {
			this.executeCommand(inputs, (err, output) => {
				msg.reply("```" + output + "```");
			});
		} else {
			msg.reply("No command specified");
		}
	}*/
};