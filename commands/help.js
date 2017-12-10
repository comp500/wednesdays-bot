const strings = require("../strings.json");
module.exports = {
	commands: ["help"],
	onMsg: (inputs, msg) => {
		// start with strings.help
		let output = strings.help.join("\n");

		output += "\n";
		// print out strings.commandHelp, for command help stuff
		output += Object.keys(strings.commandHelp).map((commandName) => {
			let line = "`wednesday " + commandName + "` - "
			line += strings.commandHelp[commandName];
			return line;
		}).join("\n");

		// reply with output
		msg.reply(output);
	}
};