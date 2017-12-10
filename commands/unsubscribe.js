let store;
const strings = require("../strings.json");
module.exports = {
	commands: ["unsubscribe"],
	onReady: (client, modulesList) => {
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		if (!msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
			let internalStore = store.getStore();
			if (!internalStore.subscriptions) {
				msg.reply(strings.unsubscribe.notsubbed);
			} else {
				let existing = internalStore.subscriptions.find((element) => {
					return element.channel == msg.channel.id
				});
				if (existing) {
					let index = internalStore.subscriptions.indexOf(existing);
					if (index > -1) {
						internalStore.subscriptions.splice(index, 1);
						store.flush();
						msg.reply(strings.subscribe.success);
					} else {
						msg.reply(strings.subscribe.arrayerror);
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