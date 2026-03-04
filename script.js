(function () {
    "use strict";

    // CONFIGURATION: Replace this with your actual proxy service URL
    const PROXY_SERVER = "https://your-proxy-service.com/main/";

    const urlInput = document.getElementById("proxy-url");
    const launchBtn = document.getElementById("launch-btn");
    const nodes = document.querySelectorAll(".node");

    // Function to launch the proxy
    function launchProxy(targetUrl) {
        if (!targetUrl) return;

        // Ensure the URL has a protocol
        let finalUrl = targetUrl.trim();
        if (!finalUrl.startsWith("http")) {
            finalUrl = "https://" + finalUrl;
        }

        console.log("INITIALIZING TUNNEL TO: " + finalUrl);

        // Many proxies use Base64 encoding for the URL to hide it from filters
        const encodedUrl = btoa(finalUrl);
        
        // Redirect the user to the proxy engine
        window.location.href = PROXY_SERVER + encodedUrl;
    }

    // Launch via Button Click
    launchBtn.addEventListener("click", () => {
        launchProxy(urlInput.value);
    });

    // Launch via "Enter" Key
    urlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            launchProxy(urlInput.value);
        }
    });

    // Launch via Quick-Link Nodes
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const site = node.innerText.toLowerCase();
            let target = "";

            // Custom logic for quick links
            switch(site) {
                case "discord": target = "discord.com"; break;
                case "roblox": target = "roblox.com"; break;
                case "instagram": target = "instagram.com"; break;
                case "geforce_now": target = "play.geforcenow.com"; break;
                default: target = site + ".com";
            }
            
            launchProxy(target);
        });
    });

})();
