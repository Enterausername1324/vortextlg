"use strict";

const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

const urlInput = document.getElementById("proxy-url");
const launchBtn = document.getElementById("launch-btn");
const quickLinks = document.querySelectorAll(".node");

function launchVortex(dest) {
    let target = dest || urlInput.value.trim();
    if (!target) return;

    if (!target.startsWith('http')) target = 'https://' + target;

    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${target}`;

    // TRY STEALTH MODE FIRST
    const win = window.open();
    if (win) {
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100vh';
        const iframe = win.document.createElement('iframe');
        iframe.src = finalUrl;
        iframe.style = "border:none;width:100%;height:100%;margin:0;padding:0;";
        win.document.body.appendChild(iframe);
    } else {
        // POP-UP BLOCKED: Use current tab instead
        window.location.href = finalUrl;
    }
}

// Button Events
launchBtn.onclick = () => launchVortex();
urlInput.onkeydown = (e) => { if (e.key === "Enter") launchVortex(); };

// Quick Link Logic
quickLinks.forEach(btn => {
    btn.onclick = () => {
        const site = btn.innerText.toLowerCase();
        if (site === "discord") launchVortex("discord.com");
        else if (site.includes("roblox")) launchVortex("roblox.com");
        else if (site.includes("geforce")) launchVortex("play.geforcenow.com");
        else launchVortex(site + ".com");
    };
});

// Panic Key
window.onkeydown = (e) => {
    if (e.key === "Escape") window.location.href = "https://classroom.google.com";
};
