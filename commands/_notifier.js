let client;
module.exports = {
	onReady: (globalClient) => {
		client = globalClient;
	},
	notify: (videoId, excludeChannel) => {
		/* eslint-disable no-console */
		console.log("notify", videoId, excludeChannel);
		/* eslint-enable no-console */
		client; // ¯\_(ツ)_/¯
	}
};