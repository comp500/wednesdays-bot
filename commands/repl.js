let client;
let replEnabled = false;
let replChannel = null;
module.exports = {
	commands: ["repl"],
	onREPL: function (msg) {
		if (replChannel == null || !replEnabled) {
			client.removeListener("message", this.onREPL);
		}
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			if (msg.channel.id == replChannel) {
				let output = eval(msg.content);
				msg.reply("`> " + output + "`");
			}
		}
	},
	onReady: (globalClient) => {
		client = globalClient;
	},
	onMsg: function (inputs, msg) {
		if (msg.author.id == require("../tokens.json")["ownerid"]) {
			if (replEnabled) {
				msg.reply("Disabling REPL...");
				client.removeListener("message", this.onREPL);
				replEnabled = false;
				replChannel = null;
			} else {
				replEnabled = true;
				replChannel = msg.channel.id;
				client.on("message", this.onREPL);
				msg.reply("REPL enabled!");
			}
		} else {
			msg.reply("You don't have permission to do that!");
		}
	}
};