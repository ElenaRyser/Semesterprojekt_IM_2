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
const data = await loadData();
console.log(data); // gibt die Daten der API oder false in der Konsole aus
//console.log(data.cmyk.value);



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
