let youtube;
const strings = require("../strings.json");
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
						msg.reply(strings.yt.error);
					} else if (youtube.existingVideoIDs.length > 0) {
						msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
					}
				}, msg);
			} else {
				msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
			}
		} else {
			youtube.updateList((err) => {
				if (err) {
					/* eslint-disable no-console */
					console.error(err);
					/* eslint-enable no-console */
					msg.reply(strings.yt.error);
				} else if (youtube.existingVideoIDs.length > 0) {
					msg.reply("https://youtube.com/watch?v=" + youtube.existingVideoIDs[0]);
				}
			}, msg);
		}
	}
};