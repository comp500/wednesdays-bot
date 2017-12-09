module.exports = {
	commands: ["ping"],
	onMsg: (inputs, msg) => msg.reply(require("../strings.json")["ping"])
};