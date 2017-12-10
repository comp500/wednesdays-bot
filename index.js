const Discord = require("discord.js");
const client = new Discord.Client();

const commandsList = {};
const onReadyList = [];
const modulesList = {};

// load commands
require("fs").readdirSync("./commands").forEach(function (file) {
	let command = require("./commands/" + file);
	modulesList[file] = command;
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
		onReady(client, modulesList);
	});
});

client.on("message", msg => {
	if (msg.content.trim().slice(0, 9).toLowerCase() === "wednesday") {
		let inputs = msg.content.trim().split(" ");
		inputs.filter((input) => input.trim().length > 0);
		
		if (inputs.length > 1) {
			if (commandKeys.includes(inputs[1].toLowerCase())) {
				commandsList[inputs[1].toLowerCase()](inputs.slice(2), msg, client);
			}
		}
	}
});

client.login(require("./tokens.json").discord);