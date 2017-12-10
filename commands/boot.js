const strings = require("../strings.json");
module.exports = {
	commands: ["boot", "startup"],
	onMsg: (inputs, msg) => {
		let boot = strings.boot;
		msg.reply("```" + boot[Math.floor(Math.random() * boot.length)] + "```");
		// TODO: the stupid ascii art
	}
};