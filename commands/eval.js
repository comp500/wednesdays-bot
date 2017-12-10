const util = require("util");
const strings = require("../strings.json");
const tokens = require("../tokens.json");
let selfInstance = {
	commands: ["eval"],
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
	onMsg: function (inputs, msg) {
		if (msg.author.id == tokens["ownerid"]) {
			try {
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
module.exports = selfInstance;