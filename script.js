/**
 * TIMELOOP OS - MASTER VORTEX SCRIPT
 * Functionality: Password Protection, XOR Encoding, Stealth Cloaking
 */
(function () {
    "use strict";

    // ==============================
    // 1. CONFIGURATION
    // ==============================
    const ACCESS_KEY = "timeloop2026"; // Your secret password
    const VORTEX_ENGINE = "https://vortex-tbmr.onrender.com";
    const PREFIX = "/service/";

    // Elements
    const gate = document.getElementById("password-gate");
    const gateInput = document.getElementById("gate-key");
    const gateStatus = document.getElementById("gate-status");
    const urlInput = document.getElementById("proxy-url");
    const launchBtn = document.getElementById("launch-btn");
    const nodes = document.querySelectorAll(".node");

    // ==============================
    // 2. PASSWORD GATE LOGIC
    // ==============================
    if (sessionStorage.getItem("vault_auth") === "true") {
        if (gate) gate.style.display = "none";
    }

    if (gateInput) {
        gateInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                if (gateInput.value === ACCESS_KEY) {
                    gateStatus.innerText = "ACCESS_GRANTED. DECRYPTING...";
                    gateStatus.style.color = "var(--neon-cyan)";
                    sessionStorage.setItem("vault_auth", "true");
                    
                    setTimeout(() => {
                        gate.style.opacity = "0";
                        setTimeout(() => gate.style.display = "none", 500);
                    }, 800);
                } else {
                    gateStatus.innerText = "INVALID_KEY. ACCESS_DENIED.";
                    gateStatus.style.color = "#ff0055";
                    gateInput.value = "";
                }
            }
        });
    }

    // ==============================
    // 3. ENCODING & STEALTH LOGIC
    // ==============================
    
    // Scramjet XOR Encoder
    function encodeUrl(str) {
        if (!str) return str;
        return encodeURIComponent(
            str.split('').map((char, ind) => 
                ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
            ).join('')
        );
    }

    function launchVortex(targetUrl) {
        if (!targetUrl) return;

        let url = targetUrl.trim();
        if (!url.startsWith('http')) url = 'https://' + url;

        // Construct the encoded proxy path
        const encodedPath = VORTEX_ENGINE + PREFIX + encodeUrl(url);

        // Open in About:Blank Cloaker
        const win = window.open();
        if (!win || win.closed) {
            alert("POP-UP BLOCKED. ENABLE POP-UPS TO USE STEALTH MODE.");
            return;
        }

        // Setup the Cloaked Tab
        win.document.title = "Classes - Google Drive";
        const favicon = win.document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
        win.document.head.appendChild(favicon);

        const style = win.document.createElement('style');
        style.textContent = `
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
            iframe { width: 100%; height: 100%; border: none; }
        `;
        win.document.head.appendChild(style);

        const iframe = win.document.createElement('iframe');
        iframe.src = encodedPath;
        win.document.body.appendChild(iframe);

        // Original Tab Panic Redirect
        window.location.replace("https://google.com");
    }

    // ==============================
    // 4. EVENT LISTENERS
    // ==============================
    if (launchBtn) {
        launchBtn.addEventListener("click", () => launchVortex(urlInput.value));
    }

    if (urlInput) {
        urlInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") launchVortex(urlInput.value);
        });
    }

    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const site = node.innerText.toUpperCase();
            const map = {
                "DISCORD": "discord.com",
                "ROBLOX": "roblox.com",
                "INSTAGRAM": "instagram.com",
                "GEFORCE_NOW": "play.geforcenow.com"
            };
            launchVortex(map[site] || site.toLowerCase() + ".com");
        });
    });

    // Panic Key: ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            window.location.href = "https://google.com";
        }
    });

})();
