// Zugriff auf Color RGB API
async function loadData() {
    const url = 'https://www.thecolorapi.com/id?rgb=rgb(0,71,171)'; // mit korrekter API-URL ersetzen
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

