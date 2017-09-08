var bp = chrome.extension.getBackgroundPage();

function truncprice(val, len, dot) {
	if (!dot)  len++
	var s, l=len-1
	while (1) {
		s=val.toFixed(l)
		if (l==0 || s.length==len) break
		l--
	}
	if (!dot) s=s.replace('.','')
	return s
}

function refresh() {
	if (bp.ticker!=null) {
		lowusd.innerHTML=parseFloat(bp.ticker.low).toFixed(2)
		highusd.innerHTML=parseFloat(bp.ticker.high).toFixed(2)
		bidusd.innerHTML=parseFloat(bp.ticker.bid).toFixed(2)
		askusd.innerHTML=parseFloat(bp.ticker.ask).toFixed(2)
		lastusd.innerHTML=parseFloat(bp.ticker.last).toFixed(2)
	}
	if (bp.tickereur!=0) {
		loweur.innerHTML=(parseFloat(bp.tickereur.low)).toFixed(2)
		higheur.innerHTML=(parseFloat(bp.tickereur.high)).toFixed(2)
		bideur.innerHTML=(parseFloat(bp.tickereur.bid)).toFixed(2)
		askeur.innerHTML=(parseFloat(bp.tickereur.ask)).toFixed(2)
		lasteur.innerHTML=(parseFloat(bp.tickereur.last)).toFixed(2)
	}
	vol.innerHTML=parseFloat(bp.ticker.volume).toFixed(0)
}

function setcur(cur) {
	if (bp.showCUR!=cur) {
		bp.showCUR = cur
		localStorage.showCUR = cur
		bp.refresh()
	}
}

document.addEventListener('DOMContentLoaded', function() {
	bp.popupRefresh=refresh
	lastusd.addEventListener('click', function(){setcur("USD")})
	lasteur.addEventListener('click', function(){setcur("EUR")})
	lastusd.title = lasteur.title = 'Click to have this value over the icon'
	refresh()
})
