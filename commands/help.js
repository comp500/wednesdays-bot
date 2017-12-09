module.exports = {
	commands: ["help"],
	onMsg: (inputs, msg, client) => msg.reply(require("../strings.json")["help"].join("\n"))
};