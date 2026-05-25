let selectedHex = null;

// Warte darauf, dass das DOM und alle Skripte geladen sind
document.addEventListener('DOMContentLoaded', () => {
    // Color Picker auf der Startseite
    const pickr = Pickr.create({
        el: '#pickr-btn',
        theme: 'classic',
        default: '#000000',
        components: {
            preview: true,
            opacity: false,
            hue: true,
            interaction: {
                hex: true,
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

    // Reagiert, wenn der Nutzer eine Farbe im Picker ändert
    pickr.on('change', (color) => {
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
});

// Feld Farbpicker -> Leitet den Nutzer bei Farbauswahl auf die Detailseite weiter
function searchColor() {
    if (selectedHex) {
        window.location.href = `colors.html?hex=${selectedHex}`;
    }
}

// Eingabefeld HEX-Code –> Leitet den Nutzer bei manueller HEX-Eingabe auf die Detailseite weiter
function searchHex() {
    let hex = document.getElementById('hex-input').value.replace('#', '');
    if (hex) {
        window.location.href = `colors.html?hex=${hex}`;
    }
}

function hslToHex(hslString) {
    const hslMatch = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    
    if (!hslMatch) return null;

    let h = parseInt(hslMatch[1]);
    let s = parseInt(hslMatch[2]) / 100; // Hier: Sättigung als 0.0 - 1.0
    let l = parseInt(hslMatch[3]) / 100; // Hier: Helligkeit als 0.0 - 1.0

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
        const hex = Math.round((val + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}


// Ruft loadData auf, wenn die Seite geladen wird
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadData().then(data => {
            console.log(data);
            displayColorData(data);
        });
    });
} else {
    loadData().then(data => {
        console.log(data);
        displayColorData(data);
    });
}

// Funktion um die Farbdaten auf der Seite anzuzeigen
function displayColorData(data) {
    if (!data || data === false) {
        console.error('Keine Farbdaten verfügbar');
        return;
    }

    // Farbnamen ändern
    const colorName = document.querySelector('#colorName');
    colorName.textContent = data.name.value;


    // Farbvorschau ändern
    const colorPreview = document.querySelector('.color-preview');
    colorPreview.style.backgroundColor = data.hex.value;


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
    // 1. Fall: Graustufen/Schwarz/Weiß -> Invertierung über Helligkeit
        if (s < 10) {
            return l > 50 ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)';
        }
    
    // 2. Fall: Bunte Farben -> Komplementärfarbe (Hue um 180° gedreht)
        const newH = (h + 180) % 360;
        return `hsl(${newH}, ${s}%, ${l}%)`;
    }

    // HSL Wert der Farbe auslesen
    const h = data.hsl.h;
    const s = data.hsl.s;
    const l = data.hsl.l;

    // Die neuen Farben berechnen
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
    colorHexCurrent.textContent = `${data.hex.value}`;

    const colorPreviewCurrent = document.querySelector('#colorPreviewCurrent');
    colorPreviewCurrent.style.backgroundColor = data.hex.value;

    // Farbe Dunkler
    const colorHexDarker = document.querySelector('#colorHexDarker');
    colorHexDarker.textContent = `${hslToHex(colorVariations.dunkler)}`;  

    const colorPreviewDarker = document.querySelector('#colorPreviewDarker');
    colorPreviewDarker.style.backgroundColor = hslToHex(colorVariations.dunkler);

    // Farbe Heller
    const colorHexBrighter = document.querySelector('#colorHexBrighter');
    colorHexBrighter.textContent = `${hslToHex(colorVariations.heller)}`;

    const colorPreviewBrighter = document.querySelector('#colorPreviewBrighter');
    colorPreviewBrighter.style.backgroundColor = hslToHex(colorVariations.heller);

    // Farbe Entsättigt
    const colorHexDesaturated = document.querySelector('#colorHexDesaturated');
    colorHexDesaturated.textContent = `${hslToHex(colorVariations.entsaettigt)}`;
    
    const colorPreviewDesaturated = document.querySelector('#colorPreviewDesaturated');
    colorPreviewDesaturated.style.backgroundColor = hslToHex(colorVariations.entsaettigt);

    // Farbe Satter
    const colorHexSaturated = document.querySelector('#colorHexSaturated');
    colorHexSaturated.textContent = `${hslToHex(colorVariations.satter)}`;
    
    const colorPreviewSaturated = document.querySelector('#colorPreviewSaturated');
    colorPreviewSaturated.style.backgroundColor = hslToHex(colorVariations.satter);

    // Farbe Kontrast
    const colorHexContrast = document.querySelector('#colorHexContrast');
    colorHexContrast.textContent = `${hslToHex(colorVariations.kontrast)}`;
    
    const colorPreviewContrast = document.querySelector('#colorPreviewContrast');
    colorPreviewContrast.style.backgroundColor = hslToHex(colorVariations.kontrast);
}

// Zugriff auf Color RGB API
async function loadData(hex) {
    // Falls kein hex übergeben wird, versuche aus der URL zu lesen
    if (!hex) {
        const urlParams = new URLSearchParams(window.location.search);
        hex = urlParams.get('hex');
    }
    
    // Fallback, falls immer noch kein hex vorhanden ist
    if (!hex) {
        hex = '000000';
    }
    
    const url = `https://www.thecolorapi.com/id?hex=${hex}`;
    try {
        loadAIColorText(hex);
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}


// 2. OpenAI-Abruf (PHP Backend)
async function loadAIColorText(colorName) {
    const url = 'api/color-text.php';

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
            console.error("OpenAI Fehler:", data.error);
            return false;
        }
        console.log(data);
        return data;

    } catch (error) {
        console.error("Fetch Fehler:", error);
        return false;
    }
}