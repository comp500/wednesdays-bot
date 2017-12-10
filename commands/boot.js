const strings = require("../strings.json");
module.exports = {
	commands: ["boot", "startup"],
	onMsg: (inputs, msg) => {
		// pick a random string from strings.boot
		let boot = strings.boot;
		msg.reply("```" + boot[Math.floor(Math.random() * boot.length)] + "```");
		// TODO: the stupid ascii art
	}
};