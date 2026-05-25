// Zugriff auf Color RGB API
async function loadData() {
    const url = 'https://www.thecolorapi.com/id?hex=24B1E0)'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
//const data = await loadData();
//console.log(data); // gibt die Daten der API oder false in der Konsole aus
//console.log(data.cmyk.value);

loadData().then(data => {
    console.log(data);
});

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

        return data;

    } catch (error) {
        console.error("Fetch Fehler:", error);
        return false;
    }
}



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

let selectedHex = null;

// Öffnet den Farbwähler, wenn der Nutzer auf das Container-Element klickt
document.querySelector('.color-picker').addEventListener('click', () => {
    pickr.show();
});

// Reagiert, wenn der Nutzer eine Farbe im Picker ändert
pickr.on('change', (color) => {
    selectedHex = color.toHEXA().toString().replace('#', '');
    document.querySelector('.color-picker').style.backgroundColor = '#' + selectedHex;
    document.getElementById('hex-input').value = '#' + selectedHex;
});

// Feld Farbpicker – Leitet den Nutzer bei Farbauswahl auf die Detailseite weiter
function searchColor() {
    if (selectedHex) {
        window.location.href = `colors.html?hex=${selectedHex}`;
    }
}

// Eingabefeld HEX-Code – Leitet den Nutzer bei manueller HEX-Eingabe auf die Detailseite weiter
function searchHex() {
    let hex = document.getElementById('hex-input').value.replace('#', '');
    if (hex) {
        window.location.href = `colors.html?hex=${hex}`;
    }
}