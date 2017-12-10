let client;
let store;
module.exports = {
	onReady: (globalClient, modulesList) => {
		client = globalClient;
		store = modulesList["_store.js"];
	},
	notify: (videoId, excludeChannel) => {
		let internalStore = store.getStore();
		if (internalStore.subscriptions) {
			internalStore.subscriptions.forEach((element) => {
				let channel = client.channels.get(element.channel);
				if (channel) {
					if (channel.id != excludeChannel) {
						channel.send("https://youtube.com/watch?v=" + videoId);
					}
				} else {
					console.log("Failed to push to " + channel.id);
				}
			});
			console.log("Successfully pushed " + videoId);
		} else {
			console.error("No subscriptions to notify, is the datastore broken?");
		}
	}
	// TODO: do this on interval
};