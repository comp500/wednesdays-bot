let youtube;
module.exports = {
	commands: ["ytrand", "youtuberand"],
	onReady: (client, modulesList) => {
		youtube = modulesList["_yt.js"];
	},
	onMsg: (inputs, msg) => {
		if (youtube.existingVideoIDs.length > 0) {
			if ((new Date() - youtube.lastRequestTime) > (1000 * 60)) { // 60 seconds between requests
				youtube.updateList((err) => {
					if (err) {
						/* eslint-disable no-console */
						console.error(err);
						/* eslint-enable no-console */
						msg.reply("There was an error retrieving the playlist.");
					} else if (youtube.existingVideoIDs.length > 0) {
						msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
					}
				}, true);
			} else {
				msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
			}
		} else {
			youtube.updateList((err) => {
				if (err) {
					/* eslint-disable no-console */
					console.error(err);
					/* eslint-enable no-console */
					msg.reply("There was an error retrieving the playlist.");
				} else if (youtube.existingVideoIDs.length > 0) {
					msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[Math.floor(Math.random() * youtube.existingVideoIDs.length)]);
				}
			}, true);
		}
	}
};