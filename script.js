(function () {
    "use strict";

    // Your Secret Clearance Key (Change this to whatever you want)
    const ACCESS_KEY = "vortexv1"; 

    const gate = document.getElementById("password-gate");
    const gateInput = document.getElementById("gate-key");
    const gateStatus = document.getElementById("gate-status");

    // Check if they already logged in this session
    if (sessionStorage.getItem("vault_auth") === "true") {
        gate.style.display = "none";
    }

    gateInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (gateInput.value === ACCESS_KEY) {
                // Success Animation
                gateStatus.innerText = "ACCESS GRANTED. DECRYPTING...";
                gateStatus.style.color = "#00ffcc";
                sessionStorage.setItem("vault_auth", "true");
                
                setTimeout(() => {
                    gate.style.opacity = "0";
                    setTimeout(() => gate.style.display = "none", 500);
                }, 1000);
            } else {
                // Fail Animation
                gateStatus.innerText = "INVALID KEY. LOCKOUT IMMINENT.";
                gateStatus.style.color = "#ff0055";
                gateInput.value = "";
                // Shake effect logic could go here
            }
        }
    });
    
    // ... rest of your launchVortex code from before ...
})();
