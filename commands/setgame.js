module.exports = {
	onReady: (client) => {
		client.user.setPresence({
			"game": {
				"name": require("../strings.json").game
			}
		});
	}
};