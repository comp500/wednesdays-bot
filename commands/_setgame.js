const strings = require("../strings.json");
module.exports = {
	onReady: (client) => {
		// on ready set the gaem
		client.user.setPresence({
			"game": {
				"name": strings.game
			}
		});
	}
};