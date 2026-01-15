const defr = 10;
const defg = 110;
const defb = 50;

let ticker = null;
let tickereur = null;
let showCUR = "USD";

// Initialize settings from storage
chrome.storage.local.get(["showCUR"], (result) => {
    if (result.showCUR) {
        showCUR = result.showCUR;
    }
});

function updateBadge() {
    const data = showCUR === "EUR" ? tickereur : ticker;
    const title = showCUR === "EUR" ? "EUR" : "USD";

    if (data && data.last) {
        chrome.action.setBadgeText({ text: parseFloat(data.last).toFixed(2) });
        chrome.action.setTitle({ title: title });
    } else {
        chrome.action.setBadgeText({ text: "..." });
    }
}

async function get_usd() {
    try {
        const response = await fetch("https://www.bitstamp.net/api/v2/ticker/ltcusd");
        if (!response.ok) throw new Error("Network response was not ok");
        ticker = await response.json();
        chrome.storage.local.set({ ticker: ticker });
        updateBadge();
    } catch (error) {
        console.error("Error fetching USD price:", error);
        chrome.action.setBadgeText({ text: "?" });
    }
    setTimeout(get_usd, 30e3);
}

async function get_eur() {
    try {
        const response = await fetch("https://www.bitstamp.net/api/v2/ticker/ltceur");
        if (!response.ok) throw new Error("Network response was not ok");
        tickereur = await response.json();
        chrome.storage.local.set({ tickereur: tickereur });
        updateBadge();
    } catch (error) {
        console.error("Error fetching EUR price:", error);
        chrome.action.setBadgeText({ text: "?" });
    }
    setTimeout(get_eur, 30e3);
}

function setcol() {
    chrome.action.setBadgeBackgroundColor({ color: [defr, defg, defb, 255] });
}

// Listen for storage changes (e.g., from popup)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.showCUR) {
        showCUR = changes.showCUR.newValue;
        updateBadge();
    }
});

// Initialization
setcol();
get_eur();
get_usd();
