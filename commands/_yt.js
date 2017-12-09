const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(require("../tokens.json").youtube);
let notifier;

module.exports = {
	onReady: (client, modulesList) => {
		notifier = modulesList["_notifier.js"];
	},
	existingVideoIDs: [],
	latestVideo: new Date(),
	lastRequestTime: new Date(),
	isFirst: true,
	updateList: function (callback, msg) { // function, because lexical 'this'
		youtube.getPlayListsItemsById(require("../strings.json").wednesdayList, 50, (err, result) => {
			if (err) {
				callback(err);
			} else if (result.length < 1) {
				callback(err);
			} else {
				// use excessive amounts of RAM with many objects to store stuff
				let newVideoIDs = [];
				let newVideoDatesList = [];
				let newVideoDatesObject = {};
				let newVideoDatesReverse = {};

				result.items.forEach(element => {
					newVideoIDs.push(element.contentDetails.videoId);
					newVideoDatesList.push(new Date(element.contentDetails.videoPublishedAt));
					newVideoDatesObject[new Date(element.contentDetails.videoPublishedAt)] = element.contentDetails.videoId;
					newVideoDatesReverse[element.contentDetails.videoId] = new Date(element.contentDetails.videoPublishedAt);
				});

				let newLatestVideo = newVideoDatesList.reduce((lastValue, currentValue) => {
					if (currentValue > lastValue) {
						return currentValue;
					} else {
						return lastValue;
					}
				});
			
				if (newLatestVideo > this.latestVideo) {
					// we have a new video!
					let newVideoID = newVideoDatesObject[newLatestVideo];
					if (!this.isFirst) {
						// if first, don't update everyone
						if (msg) {
							// if new, don't send twice
							notifier.notify(newVideoID, msg.channel.id);
						} else {
							notifier.notify(newVideoID);
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