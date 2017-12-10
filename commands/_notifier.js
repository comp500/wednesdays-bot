let client;
let store;
module.exports = {
	onReady: (globalClient, modulesList) => {
		// store client for later usage
		client = globalClient;
		// import globally required module
		store = modulesList["_store.js"];
	},
	notify: (videoId, excludeChannel) => {
		// gets the object for the datastore
		let internalStore = store.getStore();
		if (internalStore.subscriptions) {
			internalStore.subscriptions.forEach((element) => {
				// get channel for each sub
				let channel = client.channels.get(element.channel);
				if (channel) {
					if (channel.id != excludeChannel) {
						// send message to each channel, except the specified one
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