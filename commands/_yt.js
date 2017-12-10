const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(require("../tokens.json").youtube);
let notifier;
const strings = require("../strings.json");

module.exports = {
	onReady: (client, modulesList) => {
		notifier = modulesList["_notifier.js"];
	},
	existingVideoIDs: [],
	latestVideo: new Date(),
	lastRequestTime: new Date(),
	isFirst: true,
	updateList: function (callback, msg) { // function, because lexical 'this'
		youtube.getPlayListsItemsById(strings.wednesdayList, 50, (err, result) => {
			if (err) {
				callback(err);
			} else if (result.length < 1) {
				callback(err);
			} else {
				// use excessive amounts of RAM with many objects to store stuff
				let newVideoIDs = [];
				let newVideoDatesReverse = {};
				let newLatestVideoDate = this.latestVideo;
				let newLatestVideoID;

				result.items.forEach(element => {
					newVideoIDs.push(element.contentDetails.videoId);
					newVideoDatesReverse[element.contentDetails.videoId] = new Date(element.contentDetails.videoPublishedAt);
					if (new Date(element.contentDetails.videoPublishedAt) > newLatestVideoDate) {
						newLatestVideoDate = new Date(element.contentDetails.videoPublishedAt);
						newLatestVideoID = element.contentDetails.videoId;
					}
				});
			
				if (newLatestVideoDate > this.latestVideo) {
					// we have a new video!
					if (!this.isFirst) {
						// if first, don't update everyone
						if (msg) {
							// if new, don't send twice
							notifier.notify(newLatestVideoID, msg.channel.id);
						} else {
							notifier.notify(newLatestVideoID);
						}
					}
				}

				// sort by date ascending
				newVideoIDs.sort((a, b) => {
					return newVideoDatesReverse[a] - newVideoDatesReverse[b];
				});
				// reverse order, so date descending
				newVideoIDs.reverse();
				this.existingVideoIDs = newVideoIDs;

				// reset timer
				this.lastRequestTime = new Date();

				callback(null);
			}
		});
	}
};