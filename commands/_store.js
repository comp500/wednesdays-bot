const fs = require("fs");
let store;

// world's simplest key value store
// read from file, write on update
try {
	store = JSON.parse(fs.readFileSync("./store.json"));
} catch (e) {
	store = {};
}

module.exports = {
	readKey: (key) => {
		return store[key];
	},
	writeKey: (key, value) => {
		store[key] = value;
		fs.writeFileSync("./store.json", JSON.stringify(store));
	},
	// get the internal object, if you want to modify it directly
	getStore: () => {
		return store;
	},
	// save changes back to file
	flush: () => {
		fs.writeFileSync("./store.json", JSON.stringify(store));
	},
	// reload it from file, for whatever reason
	reload: () => {
		store = JSON.parse(fs.readFileSync("./store.json"));
	}
};