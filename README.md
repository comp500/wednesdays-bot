# WednesdaysBot
A discord bot. Serves fresh ZimoNitrome videos.

*Note:* Unmaintained and buggy as of 05/09/2018 (09/05/2018 if you're American), but still runs.

See the website at [infra.link/wednesdays-bot](https://infra.link/wednesdays-bot/) and the [ls.terminal.ink bot listing](https://discordbots.co.uk/bot/389083091655852032).

Invite link: [click here](https://discordapp.com/api/oauth2/authorize?client_id=389083091655852032&permissions=18432&scope=bot)

## How to set up
1. Get a discord bot token
1. Get a youtube data api (v3) token
1. Install node
1. `git clone` this thing
1. `npm i`
1. Make a tokens.json file, with the content: ```{
	"discord": "",
	"youtube": "",
	"ownerid": ""
}```
1. Put your discord token, youtube token, and your ID (enable Developer Mode in discord, right click your user) in the file
1. `node index.js`
1. You now have a bot
