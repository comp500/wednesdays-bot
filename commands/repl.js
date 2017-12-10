const util = require("util");
let client;
let replEnabled = false;
let replChannel = null;
let selfInstance = {
	commands: ["repl"],
	onREPL: function (msg) {
		if (replChannel == null || !replEnabled) {
			client.removeListener("message", selfInstance.onREPL);
		}
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			if (msg.channel.id == replChannel) {
				let output = eval(msg.content);
				msg.reply("`> " + util.inspect(output) + "`");
			}
		}
	},
	onReady: (globalClient) => {
		client = globalClient;
	},
	onMsg: function (inputs, msg) {
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			if (replEnabled) {
				client.removeListener("message", selfInstance.onREPL);
				replEnabled = false;
				replChannel = null;
				msg.reply("REPL disabled!");
			} else {
				replEnabled = true;
				replChannel = msg.channel.id;
				client.on("message", selfInstance.onREPL);
				msg.reply("REPL enabled!");
			}
		} else {
			msg.reply("You don't have permission to do that!");
		}
	}
};
module.exports = selfInstance;