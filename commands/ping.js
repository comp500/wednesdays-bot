const strings = require("../strings.json");
module.exports = {
	commands: ["ping"],
	// literally just replies with strings.ping
	onMsg: (inputs, msg) => msg.reply(strings.ping)
};