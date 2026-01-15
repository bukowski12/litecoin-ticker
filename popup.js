function refresh() {
	chrome.storage.local.get(["ticker", "tickereur"], (result) => {
		const ticker = result.ticker;
		const tickereur = result.tickereur;

		if (ticker) {
			document.getElementById("lowusd").innerHTML = parseFloat(ticker.low).toFixed(2);
			document.getElementById("highusd").innerHTML = parseFloat(ticker.high).toFixed(2);
			document.getElementById("bidusd").innerHTML = parseFloat(ticker.bid).toFixed(2);
			document.getElementById("askusd").innerHTML = parseFloat(ticker.ask).toFixed(2);
			document.getElementById("lastusd").innerHTML = parseFloat(ticker.last).toFixed(2);
			document.getElementById("vol").innerHTML = parseFloat(ticker.volume).toFixed(0);
		}

		if (tickereur) {
			document.getElementById("loweur").innerHTML = parseFloat(tickereur.low).toFixed(2);
			document.getElementById("higheur").innerHTML = parseFloat(tickereur.high).toFixed(2);
			document.getElementById("bideur").innerHTML = parseFloat(tickereur.bid).toFixed(2);
			document.getElementById("askeur").innerHTML = parseFloat(tickereur.ask).toFixed(2);
			document.getElementById("lasteur").innerHTML = parseFloat(tickereur.last).toFixed(2);
		}
	});
}

function setcur(cur) {
	chrome.storage.local.set({ showCUR: cur });
}

document.addEventListener('DOMContentLoaded', function () {
	const lastusd = document.getElementById("lastusd");
	const lasteur = document.getElementById("lasteur");

	lastusd.addEventListener('click', function () { setcur("USD"); });
	lasteur.addEventListener('click', function () { setcur("EUR"); });
	lastusd.title = lasteur.title = 'Click to have this value over the icon';

	refresh();
	// Refresh periodically if popup is open
	setInterval(refresh, 5000);
});

// Listen for storage updates to refresh UI immediately
chrome.storage.onChanged.addListener((changes, area) => {
	if (area === "local" && (changes.ticker || changes.tickereur)) {
		refresh();
	}
});
