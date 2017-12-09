module.exports = {
	commands: ["ping"],
	onMsg: (inputs, msg, client) => msg.reply(require("../strings.json")["help"])
};