var store = {
	set: function(key, value) {
		chrome.storage.sync.set({[key]: value});
	},
	get: function(key) {
		chrome.storage.sync.get([key], function(result) {
			return result.key;
		});
	}
}