const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(require("../tokens.json").youtube);
let notifier;
const strings = require("../strings.json");

module.exports = {
	onReady: (client, modulesList) => {
		// get the global notifier instance
		notifier = modulesList["_notifier.js"];
	},
	existingVideoIDs: [],
	latestVideo: new Date(),
	lastRequestTime: new Date(),
	isFirst: true,
	updateList: function (callback, msg) { // function, because lexical 'this'
		// get items from the playlist
		youtube.getPlayListsItemsById(strings.wednesdayList, 50, (err, result) => {
			if (err) {
				callback(err);
			} else if (result.length < 1) {
				callback(err);
			} else {
				// use excessive amounts of RAM with many objects to store stuff
				let newVideoIDs = [];
				let newVideoDates = {};
				let newLatestVideoDate = this.latestVideo;
				let newLatestVideoID;

				// for every item in playlist
				result.items.forEach(element => {
					// store IDs for later usage
					newVideoIDs.push(element.contentDetails.videoId);
					newVideoDates[element.contentDetails.videoId] = new Date(element.contentDetails.videoPublishedAt);
					// check if newer than program start and other videos
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
					return newVideoDates[a] - newVideoDates[b];
				});
				// reverse order, so date descending
				newVideoIDs.reverse();
				this.existingVideoIDs = newVideoIDs;

				// reset timer
				this.lastRequestTime = new Date();

				callback(null); // no error, we updated list successfully
			}
		});
	}
};