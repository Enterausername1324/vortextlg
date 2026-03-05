"use strict";

// CONFIGURATION
const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

// Check if elements exist
const urlInput = document.getElementById("proxy-url");
const launchBtn = document.getElementById("launch-btn");
const quickLinks = document.querySelectorAll(".node");

console.log("TIMELOOP_OS: Systems Check...");

function launchVortex(destination) {
    let target = destination || (urlInput ? urlInput.value.trim() : "");
    
    if (!target) {
        alert("TERMINAL_ERROR: No destination entered.");
        return;
    }

    // Fix URL
    if (!target.startsWith('http')) {
        target = 'https://' + target;
    }

    // Build the Rammerhead URL
    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${target}`;
    
    console.log("Attempting to launch: " + finalUrl);

    // TRY METHOD 1: Stealth Tab (About:Blank)
    try {
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
            // METHOD 2: Fallback to current tab if pop-up is blocked
            console.log("Pop-up blocked. Redirecting current tab...");
            window.location.href = finalUrl;
        }
    } catch (e) {
        // METHOD 3: Emergency Redirect
        window.location.href = finalUrl;
    }
}

// Attach Event Listeners
if (launchBtn) {
    launchBtn.onclick = function() {
        launchVortex();
    };
}

if (urlInput) {
    urlInput.onkeydown = function(e) {
        if (e.key === "Enter") launchVortex();
    };
}

// Quick Links
quickLinks.forEach(btn => {
    btn.onclick = function() {
        const text = btn.innerText.toLowerCase();
        if (text.includes("discord")) launchVortex("discord.com");
        else if (text.includes("roblox")) launchVortex("roblox.com");
        else launchVortex(text + ".com");
    };
});

// Panic Key
window.onkeydown = function(e) {
    if (e.key === "Escape") window.location.replace("https://google.com");
};
