let youtube;
const strings = require("../strings.json");
module.exports = {
	commands: ["ytrand", "youtuberand"],
	onReady: (client, modulesList) => {
		// import globally required module
		youtube = modulesList["_yt.js"];
		// don't force initial list update twice, this is done in yt.js
	},
	// basically the same as yt.js, except with random index
	onMsg: (inputs, msg) => {
		// if there are already existing IDs, reuse
		if (youtube.existingVideoIDs.length > 0) {
			if ((new Date() - youtube.lastRequestTime) > (1000 * 60)) { // 60 seconds between requests
				// cause an update of the playlist, print random
				youtube.updateList((err) => {
					if (err) {
						console.error(err);
						msg.reply(strings.yt.error);
					} else if (youtube.existingVideoIDs.length > 0) {
						msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
					}
				}, msg);
			} else {
				msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
			}
		} else {
			// cause an update of the playlist, print random
			youtube.updateList((err) => {
				if (err) {
					console.error(err);
					msg.reply(strings.yt.error);
				} else if (youtube.existingVideoIDs.length > 0) {
					msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
				}
			}, msg);
		}
	}
};