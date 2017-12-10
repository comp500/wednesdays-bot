let store;
const strings = require("../strings.json");
module.exports = {
	commands: ["subscribe"],
	onReady: (client, modulesList) => {
		// import globally required module
		store = modulesList["_store.js"];
	},
	onMsg: (inputs, msg) => {
		// only usable by admin, or DM member
		if (!msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
			// gets the object for the datastore
			let internalStore = store.getStore();
			// code to push msg.guild.id and msg.channel.id to internalStore.subscriptions
			// if already exists, fail or move channel
			if (!internalStore.subscriptions) {
				internalStore.subscriptions = [];
				internalStore.subscriptions.push({
					guild: msg.guild.id,
					channel: msg.channel.id,
					timezone: 0 // TODO: implement timezones
				});
				store.flush();
				msg.reply(strings.subscribe.success);
			} else {
				if (msg.guild) {
					let existing = internalStore.subscriptions.find((element) => {
						return element.guild == msg.guild.id
					});
					if (existing) {
						if (existing.channel == msg.channel.id) {
							msg.reply(strings.subscribe.existing);
						} else {
							let index = internalStore.subscriptions.indexOf(existing);
							if (index > -1) {
								internalStore.subscriptions.splice(index, 1);
								internalStore.subscriptions.push({
									guild: msg.guild.id,
									channel: msg.channel.id,
									timezone: 0 // TODO: implement timezones
								});
								store.flush();
								msg.reply(strings.subscribe.moved);
							} else {
								msg.reply(strings.subscribe.arrayerror);
							}
						}
					} else {
						internalStore.subscriptions.push({
							guild: msg.guild.id,
							channel: msg.channel.id,
							timezone: 0 // TODO: implement timezones
						});
						store.flush();
						msg.reply(strings.subscribe.success);
					}
				} else {
					let existing = internalStore.subscriptions.find((element) => {
						return element.channel == msg.channel.id
					});
					if (existing) {
						msg.reply(strings.subscribe.existing);
					} else {
						internalStore.subscriptions.push({
							guild: null,
							channel: msg.channel.id,
							timezone: 0 // TODO: implement timezones
						});
						store.flush();
						msg.reply(strings.subscribe.success);
					}
				}
			}
		} else {
			msg.reply(strings.permission);
		}
	}
};