(function () {
    "use strict";

    const urlInput = document.getElementById("proxy-url");
    const launchBtn = document.getElementById("launch-btn");
    const nodes = document.querySelectorAll(".node");

    /**
     * Launch Ultraviolet in an About:Blank stealth window
     */
    async function launchUV(targetUrl) {
        if (!targetUrl) return;

        let url = targetUrl.trim();
        if (!url.startsWith('http')) url = 'https://' + url;

        // 1. Register the UV Service Worker
        // Ensure sw.js is in your root directory!
        try {
            await navigator.serviceWorker.register('./sw.js', {
                scope: __uv$config.prefix
            });
        } catch (err) {
            console.error("Failed to register Service Worker:", err);
            alert("Security Error: Service Worker failed. Check if you are using HTTPS.");
            return;
        }

        // 2. Open the Stealth Window
        const win = window.open();
        if (!win || win.closed) {
            alert("POP-UP BLOCKED. Please enable pop-ups to use the terminal.");
            return;
        }

        // 3. Apply Tab Cloak (Google Drive)
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

        // 4. Create the Iframe using UV encoding
        const iframe = win.document.createElement('iframe');
        iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
        win.document.body.appendChild(iframe);

        // 5. Panic Redirect the original tab to look innocent
        window.location.replace("https://google.com");
    }

    // Event Listeners
    if (launchBtn) launchBtn.addEventListener("click", () => launchUV(urlInput.value));
    
    if (urlInput) {
        urlInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") launchUV(urlInput.value);
        });
    }

    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const site = node.innerText;
            const map = { 
                "DISCORD": "discord.com", 
                "ROBLOX": "roblox.com", 
                "INSTAGRAM": "instagram.com", 
                "GEFORCE_NOW": "play.geforcenow.com" 
            };
            launchUV(map[site] || site.toLowerCase() + ".com");
        });
    });

    // Global Panic Key (ESC)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.location.href = "https://google.com";
    });

})();
