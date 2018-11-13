window.addEventListener("load", loadBackground());
var interval = 10;
var currency = "USDTRY=X";
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
	xhr.open("GET", "https://query1.finance.yahoo.com/v6/finance/quote?&symbols=" + currency, true);
	xhr.onreadystatechange = function() {
	  if(xhr.readyState === 4 && xhr.status === 200) {
	  	console.log(xhr.responseText)
	    var resp = JSON.parse(xhr.responseText);
	    if (resp == null) return;
	    var data = resp.quoteResponse.result[0];
	    if (data.error != null) {
	    	setBadgeColor("black")
	    }
	    else if (lastSelling == null || lastSelling == data.ask) {
	    	setBadgeColor("blue")
	    } 
	    else if (lastSelling > data.ask) {
	    	setBadgeColor("red")
	    }
	    else {
	    	setBadgeColor("green")
	    }
	    store.set('selling', data.ask);
	    store.set('buying', data.bid);
	    lastSelling = data.ask;
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

