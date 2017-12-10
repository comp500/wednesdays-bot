const fs = require("fs");
let store;

try {
	store = JSON.parse(fs.readFileSync("../store.json"));
} catch (e) {
	store = {};
}

module.exports = {
	readKey: (key) => {
		return store[key];
	},
	writeKey: (key, value) => {
		store[key] = value;
		fs.writeFileSync("../store.json", JSON.stringify(store));
	}
};