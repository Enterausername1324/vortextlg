"use strict";

// CONFIGURATION
const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

// ELEMENT SELECTORS
const urlInput = document.getElementById("proxy-url");
const launchBtn = document.getElementById("launch-btn");
const quickLinks = document.querySelectorAll(".node");

/**
 * Core Launch Function
 */
function launchVortex(destination) {
    let target = destination || urlInput.value.trim();
    if (!target) return;

    // Add https if missing
    if (!target.startsWith('http')) {
        target = 'https://' + target;
    }

    // Build the Rammerhead URL
    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${target}`;

    // Launch in a new tab (About:Blank Stealth)
    const win = window.open();
    if (win) {
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100vh';
        win.document.body.style.backgroundColor = '#000';
        
        const iframe = win.document.createElement('iframe');
        iframe.src = finalUrl;
        iframe.style = "border:none;width:100%;height:100%;margin:0;padding:0;overflow:hidden;";
        
        win.document.body.appendChild(iframe);
    } else {
        // Fallback if popups are blocked
        window.location.href = finalUrl;
    }
}

// Button Click
if (launchBtn) {
    launchBtn.onclick = () => launchVortex();
}

// Enter Key
if (urlInput) {
    urlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") launchVortex();
    });
}

// Quick Links (Discord, Roblox, etc.)
quickLinks.forEach(button => {
    button.onclick = () => {
        const name = button.innerText.toUpperCase();
        let site = "";

        if (name.includes("DISCORD")) site = "discord.com";
        else if (name.includes("ROBLOX")) site = "now.gg/apps/roblox-corporation/5349/roblox.html";
        else if (name.includes("INSTAGRAM")) site = "instagram.com";
        else if (name.includes("GEFORCE")) site = "play.geforcenow.com";
        else site = name.toLowerCase() + ".com";

        launchVortex(site);
    };
});

// Panic Key (ESC)
window.onkeydown = (e) => {
    if (e.key === "Escape") {
        window.location.replace("https://classroom.google.com");
    }
};
