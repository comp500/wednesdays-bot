const strings = require("../strings.json");
module.exports = {
	commands: ["help"],
	onMsg: (inputs, msg) => {
		let output = strings.help.join("\n");

		output += "\n";
		output += Object.keys(strings.commandHelp).map((commandName) => {
			let line = "`wednesday " + commandName + "` - "
			line += strings.commandHelp[commandName];
			return line;
		}).join("\n");

		msg.reply(output);
	}
};