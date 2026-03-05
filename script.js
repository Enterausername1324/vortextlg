"use strict";

/**
 * TIMELOOP // VORTEX ENGINE v2.0
 * Logic: Rammerhead Session Routing
 */

const urlInput = document.getElementById("proxy-url");
const launchBtn = document.getElementById("launch-btn");
const quickLinks = document.querySelectorAll(".node");

// YOUR CONFIGURATION
const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

/**
 * The Core Launcher
 * Opens the target in a stealth about:blank window
 */
function launchVortex(destination) {
    let targetUrl = destination || urlInput.value.trim();
    if (!targetUrl) return;

    // Auto-fix URL formatting
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    // Rammerhead URL Construction
    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${targetUrl}`;

    // Create the "About:Blank" Cloak
    const win = window.open();
    if (!win) {
        alert("TERMINAL_ERROR: Pop-up blocked. Please allow pop-ups for TIMELOOP.OS");
        return;
    }

    // Set up the stealth window styling
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.backgroundColor = '#000';
    
    const iframe = win.document.createElement('iframe');
    iframe.src = finalUrl;
    iframe.style = "border:none;width:100%;height:100%;margin:0;padding:0;overflow:hidden;";
    
    win.document.body.appendChild(iframe);

    // Optional: Log the launch to the original terminal UI
    console.log(`>> UPLINK_ESTABLISHED: ${targetUrl}`);
}

/**
 * Event Listeners
 */

// 1. Launch Button Click
launchBtn.onclick = () => launchVortex();

// 2. Enter Key Support
urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") launchVortex();
});

// 3. Quick Link Buttons (Discord, Roblox, etc.)
quickLinks.forEach(button => {
    button.onclick = () => {
        const site = button.innerText.toLowerCase();
        let target = "";

        switch(site) {
            case "discord": target = "discord.com"; break;
            case "roblox": target = "now.gg/apps/roblox-corporation/5349/roblox.html"; break;
            case "instagram": target = "instagram.com"; break;
            case "geforce_now": target = "play.geforcenow.com"; break;
            default: target = site + ".com";
        }
        
        launchVortex(target);
    };
});

/**
 * PANIC_KEY (ESC)
 * Instantly redirects the current tab to Google Classroom if a teacher appears.
 */
window.onkeydown = function(e) {
    if (e.key === "Escape") {
        window.location.replace("https://classroom.google.com");
    }
};
