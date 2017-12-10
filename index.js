const Discord = require("discord.js");
const client = new Discord.Client();

// store onMsg callbacks
const commandsList = {};
// store onReady callbacks
const onReadyList = [];
// store all modules indexed by file name
const modulesList = {};

// load commands
require("fs").readdirSync("./commands").forEach(function (file) {
	// require each command
	let command = require("./commands/" + file);
	modulesList[file] = command;
	// add onMsg callbacks for each alias
	if (command.onMsg) {
		command.commands.forEach((commandName) => {
			commandsList[commandName] = command.onMsg;
		});
	}
	// add onReady callback
	if (command.onReady) {
		onReadyList.push(command.onReady);
	}
});

// store the keys to check which command
const commandKeys = Object.keys(commandsList);

client.on("ready", () => {
	// notify start of bot
	console.log(`Logged in as ${client.user.tag}!`);
	// execute each onReady
	onReadyList.forEach((onReady) => {
		onReady(client, modulesList);
	});
});

client.on("message", msg => {
	// if prefix found
	if (msg.content.trim().slice(0, 9).toLowerCase() === "wednesday") {
		// split based on spaces
		let inputs = msg.content.trim().split(" ");
		// remove empty arguments
		inputs.filter((input) => input.trim().length > 0);
		
		if (inputs.length > 1) {
			// check if command is being called
			if (commandKeys.includes(inputs[1].toLowerCase())) {
				// execute onMsg for command
				// maybe client is not needed, as msg.client can be used
				commandsList[inputs[1].toLowerCase()](inputs.slice(2), msg, client);
			}
			// fail silently otherwise, because it could be accidentally triggered
		}
	}
});

// login with given token
client.login(require("./tokens.json").discord);