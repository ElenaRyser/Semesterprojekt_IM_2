let selectedHex = null;

// Wartet darauf, dass das DOM und alle Skripte geladen sind
document.addEventListener('DOMContentLoaded', () => {
    // Color Picker auf der Startseite
    const pickrBtn = document.getElementById('pickr-btn');
    if (pickrBtn) {
    const pickr = Pickr.create({
        el: '#pickr-btn',
        theme: 'classic',
        default: '#000000',
        components: {
            preview: true,
            opacity: false,
            hue: true,
            interaction: {
                rgb: true,
                input: true,
                save: true
            }
        }
    });

    // Öffnet den Farbwähler, wenn der Nutzer auf das Container-Element klickt
    const colorPickerElement = document.querySelector('.color-picker');
    if (colorPickerElement) {
        colorPickerElement.addEventListener('click', () => {
            pickr.show();
        });
    }

    // Schliesst den Farbwähler, wenn der Nutzer auf den Save-Button klickt
    const saveButton = document.querySelector('.pcr-save');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            pickr.hide();
        });
    }

    // Reagiert, wenn der Nutzer eine Farbe im Picker ändert
    const pickrHelpText = document.querySelector('#color-label');
    pickr.on('change', (color) => {
        if (pickrHelpText) pickrHelpText.style.visibility = 'hidden';
        selectedHex = color.toHEXA().toString().replace('#', '');
        const colorPickerBg = document.querySelector('.color-picker');
        if (colorPickerBg) {
            colorPickerBg.style.backgroundColor = '#' + selectedHex;
        }
        const hexInput = document.getElementById('hex-input');
        if (hexInput) {
            hexInput.value = '#' + selectedHex;
        }
    });
 }});

// Feld Farbpicker -> Leitet den Nutzer bei Farbauswahl auf die Detailseite weiter
function searchColor() {
    if (selectedHex) {
        navigateWithLoadingScreen(selectedHex);
    }
}

// Eingabefeld HEX-Code –> Leitet den Nutzer bei manueller HEX-Eingabe auf die Detailseite weiter
function searchHex() {
    const hexInput = document.getElementById('hex-input');
    const hexError = document.getElementById('hex-error');
    
    if (hexInput && hexInput.value && hexInput.value !== '#') {
        const hexValue = hexInput.value.replace('#', '');

        // Prüft, ob der HEX-Wert gültig ist
        if (isValidHex(hexValue)) {
            if (hexError) {
                hexError.textContent = '';
                hexError.classList.remove('show');
            }
            navigateWithLoadingScreen(hexValue);
        } else {
            // Zeigt Fehlermeldung
            if (hexError) {
                hexError.textContent = 'Ungültiger HEX-Code!';
                hexError.classList.add('show');
            } else {
                console.warn('Ungültiger HEX-Code');
            }
        }
    } else {
        // Zeigt Fehlermeldung, wenn das Feld leer ist
        if (hexError) {
            hexError.textContent = 'Bitte gib einen gültigen HEX-Code ein.';
            hexError.classList.add('show');
        } else {
            console.warn('Bitte gib einen gültigen HEX-Code ein.');
        }
    }
}

// Funktion zur Validierung von HEX-Codes
function isValidHex(hex) {
    // Prüfung, ob regulärer Ausdruck für gültige HEX-Codes (3 oder 6 Zeichen)
    const hexRegex = /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/;
    return hexRegex.test(hex);
}

const hexInput = document.getElementById('hex-input');
if (hexInput) {
    hexInput.addEventListener('input', () => {
        // Normalisiert die Eingabe, nur Hex-Zeichen, gross, max Länge 6 (ohne '#')
        let val = hexInput.value.replace('#', '').toUpperCase();
        // Entfernt alle nicht-hex Zeichen
        val = val.replace(/[^0-9a-fA-F]/g, '');
        // Limit auf 6 Zeichen
        if (val.length > 6) val = val.slice(0, 6);
        hexInput.value = '#' + val;
        
        // Zeigt Fehlermeldung an, wenn die Eingabe ungültig ist
        const hexError = document.getElementById('hex-error');
        if (hexError) {
            if (val.length > 0 && !isValidHex(val)) {
                hexError.textContent = 'HEX-Code muss 3 oder 6 Zeichen lang sein';
                hexError.classList.add('show');
            } else {
                hexError.textContent = '';
                hexError.classList.remove('show');
            }
        }
    });

    hexInput.addEventListener('keydown', (e) => {
        if (hexInput.value === '#' && e.key === 'Backspace') {
            e.preventDefault();
        }
    });
}

// Hilfsfunktion für Navigation mit Loadingscreen
function navigateWithLoadingScreen(hex) {
    // 1. Speichert den HEX-Wert im sessionStorage für später
    sessionStorage.setItem('pendingHex', hex);
    // 2. Navigiert zum Loadingscreen
    window.location.href = 'loadingscreen.html';
}


// HSL zu HEX Konvertierung für Berechnung von Farbwerten in Farbvarianten
function hslToHex(hslString) {
    // Unterstützt auch Dezimalzahlen und zusätzliche Leerzeichen
    const hslMatch = hslString.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i);
    if (!hslMatch) return null;

    let h = parseFloat(hslMatch[1]);
    let s = parseFloat(hslMatch[2]) / 100; // Sättigung als 0.0 - 1.0
    let l = parseFloat(hslMatch[3]) / 100; // Helligkeit als 0.0 - 1.0

    // Die korrekte HSL-Formel für Chroma (c)
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r, g, b;

    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    const toHex = (val) => {
        // Hier: (val + m) bringt in den Bereich 0-1, dann * 255
        // Begrenzung zwischen 0 und 1, dann in 2-stellige Hex
        const v = Math.min(1, Math.max(0, val + m));
        const hex = Math.round(v * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}


// Ruft loadData auf, wenn die Seite geladen wird
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Nur ausführen, wenn wir auf colors.html sind
        if (document.querySelector('#colorName')) {
            loadData().then(data => {
                if (data) {
                    displayColorData(data);
                    // AI-Text wird nach displayColorData geladen, damit die Keywords/Description nicht überschrieben werden
                    if (document.querySelector('#colorKeywords')) {
                        loadAIColorText(data.hex.value.replace('#', ''));
                    }
                }
            }).catch(err => console.error('Fehler beim Laden der Farbdaten:', err));
        }
    });
} else {
    // Nur ausführen, wenn auf colors.html 
    if (document.querySelector('#colorName')) {
        loadData().then(data => {
            if (data) {
                console.log(data);
                displayColorData(data);
                // AI-Text wird nach displayColorData geladen, damit die Keywords/Description nicht überschrieben werden
                if (document.querySelector('#colorKeywords')) {
                    loadAIColorText(data.hex.value.replace('#', ''));
                }
            }
        }).catch(err => console.error('Fehler beim Laden der Farbdaten:', err));
    }
}

// Funktion um die Farbdaten auf der Seite anzuzeigen
function displayColorData(data) {
    if (!data || data === false) {
        console.error('Keine Farbdaten verfügbar');
        return;
    }

    // Farbnamen ändern
    const colorName = document.querySelector('#colorName');
    if (colorName) colorName.textContent = data.name.value;


    // Farbvorschau ändern
    const colorPreview = document.querySelector('.color-preview');
    if (colorPreview) colorPreview.style.backgroundColor = data.hex.value;


    // Findet alle input-field Spans in den code-card Elementen
    const codeCards = document.querySelectorAll('.codes-grid .code-card');
    
    codeCards.forEach((card, index) => {
        const span = card.querySelector('.input-field span');
        if (!span) return;

        const label = card.querySelector('label');
        const labelText = label ? label.textContent.trim() : '';

        // Füllt Farbcodes ab
        switch (labelText) {
            case 'HEX':
                if (data.hex) {
                    span.textContent = data.hex.value;
                }
                break;
            case 'RGB':
                if (data.rgb) {
                    span.textContent = `R${data.rgb.r} G${data.rgb.g} B${data.rgb.b}`;
                }
                break;
            case 'CMYK':
                if (data.cmyk) {
                    span.textContent = `C${data.cmyk.c} M${data.cmyk.m} Y${data.cmyk.y} K${data.cmyk.k}`;
                }
                break;
            case 'HSL':
                if (data.hsl) {
                    span.textContent = `H${data.hsl.h} S${data.hsl.s} L${data.hsl.l}`;
                }
                break;
            case 'HSV':
                if (data.hsv) {
                    span.textContent = `H${data.hsv.h} S${data.hsv.s} V${data.hsv.v}`;
                }
                break;
            case 'XYZ':
                if (data.XYZ) {
                    span.textContent = `X${data.XYZ.X} Y${data.XYZ.Y} Z${data.XYZ.Z}`;
                }
                break;
        }
    });

    function getContrastColor(h, s, l) {
    // 1. Fall: Graustufen/Schwarz/Weiss -> Invertierung über Helligkeit
        if (s < 10) {
            return l > 50 ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)';
        }
    
    // 2. Fall: Bunte Farben -> Komplementärfarbe (Hue um 180° gedreht)
        const newH = (h + 180) % 360;
        return `hsl(${newH}, ${s}%, ${l}%)`;
    }

    // HSL Wert der Farbe wird ausgelesen
    const h = data.hsl.h;
    const s = data.hsl.s;
    const l = data.hsl.l;

    // Die neuen Farben werden berechnet
    const colorVariations = {
        aktuell:      `hsl(${h}, ${s}%, ${l}%)`,
        dunkler:      `hsl(${h}, ${s}%, ${Math.max(0, l - 20)}%)`,
        heller:       `hsl(${h}, ${s}%, ${Math.min(100, l + 20)}%)`,
        entsaettigt:  `hsl(${h}, ${Math.max(0, s - 30)}%, ${l}%)`,
        satter:       `hsl(${h}, ${Math.min(100, s + 30)}%, ${l}%)`,
        kontrast:     getContrastColor(h, s, l)
    };

    // Farbe Aktuell
    const colorHexCurrent = document.querySelector('#colorHexCurrent');
    if (colorHexCurrent) colorHexCurrent.textContent = data.hex.value;
    
    const colorPreviewCurrent = document.querySelector('#colorPreviewCurrent');
    if (colorPreviewCurrent) colorPreviewCurrent.style.backgroundColor = data.hex.value;

    // Farbe Dunkler
    const colorHexDarker = document.querySelector('#colorHexDarker');
    if (colorHexDarker) colorHexDarker.textContent = hslToHex(colorVariations.dunkler);

    const colorPreviewDarker = document.querySelector('#colorPreviewDarker');
    if (colorPreviewDarker) colorPreviewDarker.style.backgroundColor = hslToHex(colorVariations.dunkler);

    // Farbe Heller
    const colorHexBrighter = document.querySelector('#colorHexBrighter');
    if (colorHexBrighter) colorHexBrighter.textContent = hslToHex(colorVariations.heller);

    const colorPreviewBrighter = document.querySelector('#colorPreviewBrighter');
    if (colorPreviewBrighter) colorPreviewBrighter.style.backgroundColor = hslToHex(colorVariations.heller);

    // Farbe Entsättigt
    const colorHexDesaturated = document.querySelector('#colorHexDesaturated');
    if (colorHexDesaturated) colorHexDesaturated.textContent = hslToHex(colorVariations.entsaettigt);

    const colorPreviewDesaturated = document.querySelector('#colorPreviewDesaturated');
    if (colorPreviewDesaturated) colorPreviewDesaturated.style.backgroundColor = hslToHex(colorVariations.entsaettigt);

    // Farbe Satter
    const colorHexSaturated = document.querySelector('#colorHexSaturated');
    if (colorHexSaturated) colorHexSaturated.textContent = hslToHex(colorVariations.satter);

    const colorPreviewSaturated = document.querySelector('#colorPreviewSaturated');
    if (colorPreviewSaturated) colorPreviewSaturated.style.backgroundColor = hslToHex(colorVariations.satter);

    // Farbe Kontrast
    const colorHexContrast = document.querySelector('#colorHexContrast');
    if (colorHexContrast) colorHexContrast.textContent = hslToHex(colorVariations.kontrast);

    const colorPreviewContrast = document.querySelector('#colorPreviewContrast');
    if (colorPreviewContrast) colorPreviewContrast.style.backgroundColor = hslToHex(colorVariations.kontrast);
}

// Zugriff auf Color RGB API
async function loadData(hex) {
    // Falls kein HEX übergeben wird, versuche aus der URL zu lesen
    if (!hex) {
        const urlParams = new URLSearchParams(window.location.search);
        hex = urlParams.get('hex');
    }
    
    // Fallback, falls immer noch kein HEX vorhanden ist
    if (!hex) {
        hex = '000000';
    }
    
    const url = `https://www.thecolorapi.com/id?hex=${hex}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}

// 2. GeminiAI-Abruf (PHP Backend)
async function loadAIColorText(colorName) {
    const url = 'api/color-text.php';
    
    const h2 = document.querySelector('h2#colorKeywords');
    const p = document.querySelector('p#colorDescription');
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ colorName })
        });

        const data = await response.json();
        
        if (!data.ok) {
            console.error("GeminiAI Fehler:", data.error);
            // Fehlermeldung anzeigen mit Platzhaltertexten
            if (h2) h2.textContent = "Deine KI-Anfragen übersteigen das Anfrage-Limit";
            if (p) p.textContent = "Aber ich bin mir sicher, deine Farbe ist einzigartig und wunderschön! Wenn du ein paar Minuten wartest, kannst du es gerne nochmal versuchen, dann kann ich dir sicher wieder einen Text generieren.";
            return false;
        }

        if (h2) h2.textContent = data.keywords;
        if (p) p.textContent = data.text;

        return data;

    } catch (error) {
        console.error("Fetch Fehler:", error);
        // Fehlermeldung anzeigen mit Platzhaltertexten
        if (h2) h2.textContent = "Deine KI-Anfragen übersteigen das Anfrage-Limit";
        if (p) p.textContent = "Aber ich bin mir sicher, deine Farbe ist einzigartig und wunderschön! Wenn du ein paar Minuten wartest, kannst du es gerne nochmal versuchen, dann kann ich dir sicher wieder einen Text generieren.";
        return false;
    }
}

// Loadingscreen-Logik
// Prüft, ob ein HEX-Wert im sessionStorage vorhanden ist
const pendingHex = sessionStorage.getItem('pendingHex');

if (pendingHex) {
    // Nach 3 Sekunden navigieren zu colors.html
    const navigationTimeout = setTimeout(() => {
        sessionStorage.removeItem('pendingHex'); // Cleanup
        window.location.href = `colors.html?hex=${pendingHex}`;
    }, 3000);
    
    // Cleanup bei Seitenwechsel
    window.addEventListener('beforeunload', () => {
        clearTimeout(navigationTimeout);
    });
} else if (window.location.pathname.includes('loadingscreen.html')) {
    // Falls kein HEX vorhanden, zurück zur Startseite
    const returnTimeout = setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
    
    // Cleanup bei Seitenwechsel
    window.addEventListener('beforeunload', () => {
        clearTimeout(returnTimeout);
    });
}

async function copyToClipboard(elementId, button) {
    const el = document.getElementById(elementId);
    if (!el) {
        console.warn(`copyToClipboard: Element mit id "${elementId}" nicht gefunden.`);
        return false;
    }

    const textToCopy = el.textContent || '';

    try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            // Fallback: versucht execCommand (ältere Browser)
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        } else {
            await navigator.clipboard.writeText(textToCopy);
        }
        
        // Button-Styling: weisser Hintergrund, schwarzes Icon
        if (button) {
            button.style.backgroundColor = '#ffffff';
            const icon = button.querySelector('img');
            if (icon) {
                icon.style.filter = 'brightness(0)';
            }
            
            // Nach 1 Sekunde zurücksetzen
            setTimeout(() => {
                button.style.backgroundColor = '';
                if (icon) {
                    icon.style.filter = '';
                }
            }, 1000);
        }
        
    } catch (err) {
        console.error('Fehler beim Kopieren: ', err);
    }
}

if (window.innerWidth <= 768) {
    const grid = document.querySelector('.variants-grid');
    if (grid) {
        grid.scrollLeft = 0;
    }
}
