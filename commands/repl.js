const util = require("util");
const strings = require("../strings.json");
const tokens = require("../tokens.json");
let replEnabled = false;
let replChannel = null;
let modulesList;
let selfInstance = {
	commands: ["repl"],
	superInspect: function (obj) {
		let output = util.inspect(obj);
		if (output.length < 1000) {
			return output;
		} else {
			output = util.inspect(obj, {depth: 1});
			if (output.length > 1000) {
				output = util.inspect(obj, {depth: 0});
				if (output.length > 1000) {
					return strings.repl.toolarge;
				} else {
					return output;
				}
			} else {
				return output;
			}
		}
	},
	onREPL: function (msg) {
		if (replChannel == null || !replEnabled) {
			msg.client.removeListener("message", selfInstance.onREPL);
		}
		if (msg.author.id == tokens.ownerid) {
			if (msg.channel.id == replChannel) {
				if (msg.content.slice(0, 2) != "//") { // comment with //
					try {
						let output = eval(msg.content);
						msg.reply("`> " + selfInstance.superInspect(output) + "`");
					} catch (e) {
						msg.reply(strings.update.error + "\n`" + e + "`");
					}
				}
			}
		}
	},
	onReady: (client, importModulesList) => {
		modulesList = importModulesList;
		modulesList; // there ESLint, I used the variable
	},
	onMsg: function (inputs, msg) {
		if (msg.author.id == tokens.ownerid) {
			if (replEnabled) {
				msg.client.removeListener("message", selfInstance.onREPL);
				replEnabled = false;
				replChannel = null;
				msg.reply(strings.repl.disabled);
			} else {
				replEnabled = true;
				replChannel = msg.channel.id;
				msg.client.on("message", selfInstance.onREPL);
				msg.reply(strings.repl.enabled);
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};
module.exports = selfInstance;