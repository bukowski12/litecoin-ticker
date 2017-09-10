const defr = 10
const defg = 110
const defb = 50

var r = defr
var g = defg
var b = defg
var ticker = null
var tickereur = null
var popupRefresh = null
var showCUR = localStorage.showCUR || "USD";

function refresh_popup() {
	if (popupRefresh != null) {
		try {
			popupRefresh()
		} catch (e) {
			popupRefresh=null
		}
	}
}

function refresh() {
	if (showCUR=="EUR" && tickereur!=null) {
			chrome.browserAction.setBadgeText({text: ((parseFloat(tickereur.last))).toFixed(2)});
			chrome.browserAction.setTitle({title: "EUR"});
		} else {
			chrome.browserAction.setBadgeText({text: parseFloat(ticker.last).toFixed(2)});
			chrome.browserAction.setTitle({title: "USD"});
		}
		refresh_popup()
}


function get_usd() {
	var req = new XMLHttpRequest()
	req.open("GET", "https://www.bitstamp.net/api/v2/ticker/ltcusd")
	req.onerror = function() {
		chrome.browserAction.setBadgeText({text: "?"})
		setTimeout(get_usd, 10e3)
	}
	req.onload = function() {
		try {
			ticker = JSON.parse(req.responseText)
			//console.log(ticker)
			refresh()
		} catch (e) {
			chrome.browserAction.setBadgeText({text: "..."})
		}
		setTimeout(get_usd, 30e3)
	}
	req.send(null)
}

function get_eur() {
	var req = new XMLHttpRequest()
	req.open("GET", "https://www.bitstamp.net/api/v2/ticker/ltceur")
	req.onerror = function() {
		chrome.browserAction.setBadgeText({text: "?"})
		setTimeout(get_eur, 10e3)
	}
	req.onload = function() {
		try {
			tickereur = JSON.parse(req.responseText)
			//console.log(ticker)
			refresh()
		} catch (e) {
			chrome.browserAction.setBadgeText({text: "..."})
		}
		setTimeout(get_eur, 30e3)
	}
	req.send(null)
}

function setcol() {
	chrome.browserAction.setBadgeBackgroundColor({color:[r, g, b, 255]});
}
setcol()
get_eur()
get_usd()
