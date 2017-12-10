const strings = require("../strings.json");
module.exports = {
	onReady: (client) => {
		client.user.setPresence({
			"game": {
				"name": strings.game
			}
		});
	}
};