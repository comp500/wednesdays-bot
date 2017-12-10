const strings = require("../strings.json");
module.exports = {
	commands: ["invite"],
	// literally just replies with strings.invite
	onMsg: (inputs, msg) => msg.reply(strings.invite)
};