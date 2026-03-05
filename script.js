"use strict";

const urlInput = document.getElementById("url-input");
const launchBtn = document.getElementById("launch-btn");

// Your specific Rammerhead Session ID
const SESSION_ID = "7e81969e8dd6408180a7a7c6e2925873";
// The public server hosting the engine
const PROXY_SERVER = "https://demo-opensource.rammerhead.org";

function launchVortex() {
    let targetUrl = urlInput.value.trim();
    if (!targetUrl) return;

    // Fix the URL if they forgot https
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    // Rammerhead format: {server}/main/{session}/{targetUrl}
    const finalUrl = `${PROXY_SERVER}/main/${SESSION_ID}/${targetUrl}`;

    // Open in a new stealth tab
    const win = window.open();
    if (!win) {
        alert("Pop-up blocked! Please allow pop-ups for TIMELOOP.OS");
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

// Bind the events
launchBtn.onclick = launchVortex;
urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") launchVortex();
});
