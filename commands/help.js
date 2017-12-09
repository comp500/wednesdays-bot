module.exports = {
	commands: ["help"],
	onMsg: (inputs, msg, client) => {
		let strings = require("../strings.json");
		let output = strings["help"].join("\n");

		output += Object.keys(strings.commandHelp).forEach((commandName) => {
			let line = "`wednesday " + commandName + "` - "
			line += strings.commandHelp[commandName];
			return line;
		}).join("\n");

		msg.reply();
	}
};