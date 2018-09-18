window.addEventListener("load", loadBackground());
var interval = 10;
var currency = "USD";
var lastSelling = store.get('selling');

function loadBackground() {
    startData()
}

function startData(){
	getData()
	setTimeout(function(){ startData(); }, interval * 1000);
}

function setBadge(price) {
	chrome.browserAction.setBadgeText({
        'text': parseFloat(Math.round(price * 100) / 100).toFixed(2)
    });
}

function getData() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://www.doviz.com/api/v1/currencies/" + currency + "/latest", true);
	xhr.onreadystatechange = function() {
	  if(xhr.readyState === 4 && xhr.status === 200) {
	    var resp = JSON.parse(xhr.responseText);
	    if (resp == null) return;
	    if (lastSelling == null || lastSelling == resp.selling) {
	    	setBadgeColor("blue")
	    } 
	    else if (lastSelling > resp.selling) {
	    	setBadgeColor("red")
	    }
	    else {
	    	setBadgeColor("green")
	    }
	    store.set('selling', resp.selling);
	    store.set('buying', resp.buying);
	    lastSelling = resp.selling;
	    setBadge(lastSelling);
	  }
	  else {
		setBadgeColor("black")
	  }
	} 
	xhr.send();
}

function setBadgeColor(color) {
    var HexaColor = "#0588c7";
    switch (color) {
        case "blue":
            HexaColor = "#0588c7";
            break;
        case "red":
            HexaColor = "#cc3c3c";
            break;
        case "green":
            HexaColor = "#05c712";
            break;
        case "black":
            HexaColor = "#000000";
            break;
    }
    chrome.browserAction.setBadgeBackgroundColor({
        color: HexaColor
    });
}

