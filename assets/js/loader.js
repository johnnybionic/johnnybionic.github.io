// /assets/js/loader.js
// improvements suggested by CoPilot

// List scripts in the order they must load
const scripts = [
    "/assets/js/jquery.min.js",
    "/assets/js/include.js",
    "/assets/js/browser.min.js",
    "/assets/js/breakpoints.min.js",
    "/assets/js/util.js",
    "/assets/js/main.js",
    "/assets/js/load-header.js",
    "/assets/js/load-sidebar.js"
];

// Dynamically load scripts in sequence
function loadScriptSequentially(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;   // ensures order
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
    });
}

// Load all scripts in order
(async () => {
    for (const src of scripts) {
        try {
            await loadScriptSequentially(src);
        } catch (err) {
            console.error(err);
        }
    }
})();
