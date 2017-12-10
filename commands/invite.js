const strings = require("../strings.json");
module.exports = {
	commands: ["invite"],
	onMsg: (inputs, msg) => msg.reply(strings.invite)
};