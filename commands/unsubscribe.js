let store;
const strings = require("../strings.json");
module.exports = {
	commands: ["unsubscribe"],
	onReady: (client, modulesList) => {
		// import globally required module
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		// only usable by admin, or DM member
		if (!msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
			// gets the object for the datastore
			let internalStore = store.getStore();
			if (!internalStore.subscriptions) {
				msg.reply(strings.unsubscribe.notsubbed);
			} else {
				// find channel with id same as current
				let existing = internalStore.subscriptions.find((element) => {
					return element.channel == msg.channel.id
				});
				if (existing) {
					let index = internalStore.subscriptions.indexOf(existing);
					if (index > -1) {
						// splice out subscription
						internalStore.subscriptions.splice(index, 1);
						// flush changes
						store.flush();
						msg.reply(strings.unsubscribe.success);
					} else {
						// we did a find() of it, why does indexOf() not work
						// TODO: maybe switching to indexOf entirely is more efficient?
						msg.reply(strings.unsubscribe.arrayerror);
					}
				} else {
					msg.reply(strings.unsubscribe.notsubbed);
				}
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};