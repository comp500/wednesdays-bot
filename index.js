const Discord = require("discord.js");
const client = new Discord.Client();

const commandsList = {};
const onReadyList = [];
const globalYoutube = require("./youtubemodule.js");

// load commands
require("fs").readdirSync("./commands").forEach(function (file) {
	let command = require("./commands/" + file);
	if (command.onMsg) {
		command.commands.forEach((commandName) => {
			commandsList[commandName] = command.onMsg;
		});
	}
	if (command.onReady) {
		onReadyList.push(command.onReady);
	}
});

const commandKeys = Object.keys(commandsList);

client.on("ready", () => {
	/* eslint-disable no-console */
	console.log(`Logged in as ${client.user.tag}!`);
	/* eslint-enable no-console */
	onReadyList.forEach((onReady) => {
		onReady(client, globalYoutube);
	});
});

client.on("message", msg => {
	if (msg.content.trim().slice(0, 9).toLowerCase() === "wednesday") {
		let inputs = msg.content.trim().toLowerCase().split(" ");
		inputs.filter((input) => input.trim().length > 0);

		if (commandKeys.includes(inputs[1])) {
			commandsList[inputs[1]](inputs.slice(2), msg, client);
		} else {
			if (commandKeys.includes("help")) {
				commandsList["help"](inputs.slice(1), msg, client);
			}
		}
	}
});

client.login(require("./tokens.json").discord);