"use strict";

const urlInput = document.getElementById("proxy-url");
const launchBtn = document.getElementById("launch-btn");
const quickLinks = document.querySelectorAll(".node");

const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

function launchVortex(destination) {
    console.log(">> INITIATING_UPLINK...");
    
    let targetUrl = destination || urlInput.value.trim();
    if (!targetUrl) {
        console.error("!! NO_URL_DETECTED");
        return;
    }

    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${targetUrl}`;
    console.log(">> TARGET_GENERATED: " + finalUrl);

    // TRYING THE CLOAK
    const win = window.open();
    if (!win) {
        alert("CRITICAL_ERROR: Pop-up blocked! Look at your address bar to allow pop-ups.");
        return;
    }

    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.backgroundColor = '#000';
    
    const iframe = win.document.createElement('iframe');
    iframe.src = finalUrl;
    iframe.style = "border:none;width:100%;height:100%;margin:0;padding:0;overflow:hidden;";
    
    win.document.body.appendChild(iframe);
}

// Ensure the buttons exist before adding listeners
if (launchBtn) {
    launchBtn.onclick = () => launchVortex();
}

if (urlInput) {
    urlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") launchVortex();
    });
}

// Quick Links
quickLinks.forEach(button => {
    button.onclick = () => {
        const site = button.innerText.toLowerCase();
        let target = "";
        if (site === "discord") target = "discord.com";
        else if (site === "roblox") target = "now.gg/apps/roblox-corporation/5349/roblox.html";
        else if (site === "geforce_now") target = "play.geforcenow.com";
        else target = site + ".com";
        launchVortex(target);
    };
});

window.onkeydown = (e) => {
    if (e.key === "Escape") window.location.replace("https://classroom.google.com");
};
