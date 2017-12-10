let youtube;
const strings = require("../strings.json");
module.exports = {
	commands: ["yt", "youtube", "zimonitrome"],
	onReady: (client, modulesList) => {
		// import globally required module
		youtube = modulesList["_yt.js"];
		// force initial list update
		youtube.updateList((err) => {
			if (err) {
				console.error(err);
			}
		});
	},
	onMsg: (inputs, msg) => {
		// if there are already existing IDs, reuse
		if (youtube.existingVideoIDs.length > 0) {
			if ((new Date() - youtube.lastRequestTime) > (1000 * 60)) { // 60 seconds between requests
				// cause an update of the playlist, print latest
				youtube.updateList((err) => {
					if (err) {
						console.error(err);
						msg.reply(strings.yt.error);
					} else if (youtube.existingVideoIDs.length > 0) {
						msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
					}
				}, msg);
			} else {
				msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
			}
		} else {
			// cause an update of the playlist, print latest
			youtube.updateList((err) => {
				if (err) {
					console.error(err);
					msg.reply(strings.yt.error);
				} else if (youtube.existingVideoIDs.length > 0) {
					msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
				}
			}, msg);
		}
	}
};