(function () {
    "use strict";

    const VORTEX_ENGINE = "https://vortex-tbmr.onrender.com";
    const PREFIX = "/service/";

    const urlInput = document.getElementById("proxy-url");
    const launchBtn = document.getElementById("launch-btn");
    const nodes = document.querySelectorAll(".node");

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

        const encodedPath = VORTEX_ENGINE + PREFIX + encodeUrl(url);

        // Open in About:Blank Cloaker
        const win = window.open();
        if (!win || win.closed) {
            alert("POP-UP BLOCKED! Enable pop-ups to use the terminal.");
            return;
        }

        // Stealth Tab Config
        win.document.title = "Classes - Google Drive";
        const favicon = win.document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
        win.document.head.appendChild(favicon);

        const style = win.document.createElement('style');
        style.textContent = `body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000;}iframe{width:100%;height:100%;border:none;}`;
        win.document.head.appendChild(style);

        const iframe = win.document.createElement('iframe');
        iframe.src = encodedPath;
        win.document.body.appendChild(iframe);

        // Original Tab Panic Redirect
        window.location.replace("https://google.com");
    }

    // Handlers
    if (launchBtn) launchBtn.addEventListener("click", () => launchVortex(urlInput.value));
    if (urlInput) urlInput.addEventListener("keypress", (e) => { if (e.key === "Enter") launchVortex(urlInput.value); });

    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const site = node.innerText;
            const map = { "DISCORD": "discord.com", "ROBLOX": "roblox.com", "INSTAGRAM": "instagram.com", "GEFORCE_NOW": "play.geforcenow.com" };
            launchVortex(map[site] || site.toLowerCase() + ".com");
        });
    });

    document.addEventListener("keydown", (e) => { if (e.key === "Escape") window.location.href = "https://google.com"; });
})();
