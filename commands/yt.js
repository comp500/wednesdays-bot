const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(require("../tokens.json").youtube);

module.exports = {
	commands: ["yt", "youtube", "zimonitrome"],
	onMsg: (inputs, msg) => {
		youtube.getPlayListsItemsById(require("./strings.json").wednesdayList, null, (err, result) => {
			if (err) {
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
				msg.reply("There was an error retrieving the playlist.");
			} else {
				/* eslint-disable no-console */
				console.log(JSON.stringify(result));
				msg.reply("Not implemented yet.");
			}
		});
	}
};