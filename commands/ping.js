const strings = require("../strings.json");
module.exports = {
	commands: ["ping"],
	onMsg: (inputs, msg) => msg.reply(strings.ping)
};