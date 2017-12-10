let exec;
module.exports = {
	commands: ["update"],
	onReady: (client, modulesList) => {
		exec = modulesList["exec.js"];
	},
	onMsg: (inputs, msg) => {
		exec.executeCommand("git pull origin master", (err, output) => {
			if (err) {
				msg.reply("Execution error: \n" + err);
			} else {
				msg.reply("```" + output + "```\nRestarting...");
				exec.executeCommand("pm2 restart index");
			}
		});
		//TODO: message after restart
	}
};