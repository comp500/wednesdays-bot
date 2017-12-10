const util = require("util");
const strings = require("../strings.json");
const tokens = require("../tokens.json");
let modulesList;
let selfInstance = {
	commands: ["eval"],
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
	onReady: function (client, importModulesList) {
		// make modulesList accessible to eval
		modulesList = importModulesList;
		modulesList; // there ESLint, I used the variable
	},
	onMsg: function (inputs, msg) {
		// only usable by owner
		if (msg.author.id == tokens.ownerid) {
			try {
				// evaluate input
				let output = eval(inputs.join(" "));
				msg.reply("`> " + selfInstance.superInspect(output) + "`");
			} catch (e) {
				msg.reply(strings.update.error + "\n`" + e + "`");
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};
// used to make functions accessible to self, because 'this' is broken
module.exports = selfInstance;