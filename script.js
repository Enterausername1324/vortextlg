(function () {
    "use strict";

    // Your Render Proxy URL
    const VORTEX_ENGINE = "https://vortex-tbmr.onrender.com";
    const PREFIX = "/service/"; // Standard Scramjet/UV prefix

    const urlInput = document.getElementById("proxy-url");
    const launchBtn = document.getElementById("launch-btn");

    /**
     * Scramjet uses a specific XOR encoding to hide URLs from school filters.
     * This function replicates that encoding so the engine can read it.
     */
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

        // Construct the final proxy path
        // Format: https://vortex-tbmr.onrender.com/service/[ENCODED_URL]
        const finalPath = VORTEX_ENGINE + PREFIX + encodeUrl(url);
        
        console.log("TUNNELING THROUGH VORTEX: " + url);
        window.location.href = finalPath;
    }

    // Event Listeners
    launchBtn.addEventListener("click", () => launchVortex(urlInput.value));
    urlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") launchVortex(urlInput.value);
    });

    // Handle Quick Nodes
    document.querySelectorAll(".node").forEach(node => {
        node.addEventListener("click", () => {
            const site = node.innerText.toLowerCase();
            const map = {
                "discord": "discord.com",
                "roblox": "roblox.com",
                "geforce_now": "play.geforcenow.com"
            };
            launchVortex(map[site] || site + ".com");
        });
    });
})();
