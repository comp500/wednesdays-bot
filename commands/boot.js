module.exports = {
	commands: ["boot", "startup"],
	onMsg: (inputs, msg) => {
		let boot = require("../strings.json").boot;
		msg.reply("```" + boot[Math.floor(Math.random() * boot.length)] + "```");
		// TODO: the stupid ascii art
	}
};