let youtube;
module.exports = {
	commands: ["yt", "youtube", "zimonitrome"],
	onReady: (client, modulesList) => {
		youtube = modulesList["_yt.js"];
		youtube.updateList((err) => {
			if (err) {
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
			}
		});
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
						msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
					}
				}, true);
			} else {
				msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
			}
		} else {
			youtube.updateList((err) => {
				if (err) {
					/* eslint-disable no-console */
					console.error(err);
					/* eslint-enable no-console */
					msg.reply("There was an error retrieving the playlist.");
				} else if (youtube.existingVideoIDs.length > 0) {
					msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
				}
			}, true);
		}
	}
};