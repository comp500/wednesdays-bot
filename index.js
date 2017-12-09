const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
	if (msg.content.trim().slice(0, 9).toLowerCase() === "wednesday") {
		let inputs = msg.content.trim().toLowerCase().split(" ");
		inputs.filter((input) => input.trim().length > 0);
		if (inputs[1] === "ping") {
			msg.reply("WednesdaysBot online!");
		}
	}
});

client.login(require("./token.json")[0]);