const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(require("./tokens.json").youtube);

module.exports = {
	existingVideoIDs: [],
	latestVideo: new Date(),
	lastRequestTime: new Date(),
	updateList: function (callback, isCommand, isFirst) { // function, because lexical 'this'
		youtube.getPlayListsItemsById(require("./strings.json").wednesdayList, 50, (err, result) => {
			if (err) {
				callback(err);
			} else if (result.length < 1) {
				callback(err);
			} else {
				/* eslint-disable no-console */
				console.log(JSON.stringify(result));
				/* eslint-enable no-console */
				let newVideoIDs = [];
				let newVideoDates = [];
				let newVideoDatesReverse = {};

				result.items.forEach(element => {
					newVideoIDs.push(element.contentDetails.videoId);
					newVideoDates.push(new Date(element.contentDetails.videoPublishedAt));
					newVideoDatesReverse[element.contentDetails.videoId] = new Date(element.contentDetails.videoPublishedAt);
				});

				let newLatestVideo = newVideoDates.reduce((lastValue, currentValue) => {
					if (currentValue > lastValue) {
						return currentValue;
					} else {
						return lastValue;
					}
				});
			
				if (newLatestVideo > this.latestVideo) {
					// we have a new video!
					if (!isFirst) {
						// if first, don't update everyone
						if (isCommand) {
							// if new, don't send twice
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