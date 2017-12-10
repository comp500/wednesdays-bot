const util = require("util");
const strings = require("../strings.json");
const tokens = require("../tokens.json");
let replEnabled = false;
let replChannel = null;
let modulesList;
let selfInstance = {
	commands: ["repl"],
	// util.inspect function that attempts truncation to below 1000 characters, to preserve sanity
	superInspect: function (obj) {
		// try default
		let output = util.inspect(obj);
		if (output.length < 1000) {
			return output;
		} else {
			// try depth 1
			output = util.inspect(obj, {depth: 1});
			if (output.length > 1000) {
				// try depth 0
				output = util.inspect(obj, {depth: 0});
				if (output.length > 1000) {
					// gracefully fail
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
		// extra onmessage handler, that handles REPL
		if (replChannel == null || !replEnabled) {
			msg.client.removeListener("message", selfInstance.onREPL);
		}
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			// only usable in specific channel
			if (msg.channel.id == replChannel) {
				if (msg.content.slice(0, 2) != "//") { // comment with //
					try {
						// evaluate input
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
		// make modulesList accessible to eval
		modulesList = importModulesList;
		modulesList; // there ESLint, I used the variable
	},
	onMsg: function (inputs, msg) {
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			// toggle evaluation mode
			if (replEnabled) {
				msg.client.removeListener("message", selfInstance.onREPL);
				replEnabled = false;
				replChannel = null;
				msg.reply(strings.repl.disabled);
			} else {
				// store channel for REPL
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
// used to make functions accessible to self, because 'this' is broken
module.exports = selfInstance;