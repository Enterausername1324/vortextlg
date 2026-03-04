/**
 * THE INVISIBLE CLOAKER 
 * This creates a new window with no history trace.
 */
function launchVortex(targetUrl) {
    if (!targetUrl) return;

    let url = targetUrl.trim();
    if (!url.startsWith('http')) url = 'https://' + url;

    // 1. Encode the URL for your Render Vortex engine
    const VORTEX_ENGINE = "https://vortex-tbmr.onrender.com";
    const PREFIX = "/service/";
    
    const encodedUrl = VORTEX_ENGINE + PREFIX + encodeUrl(url);

    // 2. Open the 'About:Blank' window
    const win = window.open();
    if (!win || win.closed) {
        alert("Pop-up blocked! Please allow pop-ups for the Timeloop Terminal.");
        return;
    }

    // 3. Style the new window to be a full-screen stealth frame
    const style = win.document.createElement('style');
    style.textContent = `
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
        iframe { width: 100%; height: 100%; border: none; }
    `;
    win.document.head.appendChild(style);

    // 4. Create the Iframe that holds the actual proxy
    const iframe = win.document.createElement('iframe');
    iframe.src = encodedUrl;
    win.document.body.appendChild(iframe);

    // 5. Change the Tab Title/Icon of the new blank window for extra stealth
    win.document.title = "Classes - Google Drive";
    const link = win.document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
    win.document.head.appendChild(link);

    // Optional: Return to a "safe" page on the original tab
    window.location.replace("https://google.com");
}
